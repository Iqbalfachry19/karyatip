// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract KaryaTip {
    IERC20 public tipToken;

    struct Work {
    uint256 id;
    string title;
    string content;
    uint256 totalTips;
    address author;
}


    struct Author {
        address authorAddress;
        string name;
        string bio;
        Work[] works;
        uint256 totalTips;
        bool registered;
    }

    mapping(address => Author) public authors;
    address[] private authorAddresses;

    uint256 private workIdCounter = 1; // Start from 1 for easier debugging

    event AuthorRegistered(address indexed author, string name, string bio);
    event WorkSubmitted(address indexed author, uint256 workId, string title, string content);
    event TipSent(address indexed from, address indexed to, uint256 amount);
    event BioUpdated(address indexed author, string newBio);
    event WorkDeleted(address indexed author, uint256 workId);
    event WorkUpdated(address indexed author, uint256 workId, string newTitle, string newContent);

    modifier onlyRegistered() {
        require(authors[msg.sender].registered, "You are not a registered author");
        _;
    }

    constructor(address _tokenAddress) {
        tipToken = IERC20(_tokenAddress);
    }

    function registerAuthor(string calldata _name, string calldata _bio) external {
        require(!authors[msg.sender].registered, "Already registered");

        Author storage author = authors[msg.sender];
        author.authorAddress = msg.sender;
        author.name = _name;
        author.bio = _bio;
        author.registered = true;

        authorAddresses.push(msg.sender);
        emit AuthorRegistered(msg.sender, _name, _bio);
    }

    function tipAuthor(address _author, uint256 _amount) external {
        require(authors[_author].registered, "Author not registered");
        require(_amount > 0, "Tip must be greater than 0");

        require(tipToken.transferFrom(msg.sender, _author, _amount), "Token transfer failed");

        authors[_author].totalTips += _amount;

        emit TipSent(msg.sender, _author, _amount);
    }

    function tipAuthorWork(address _author, uint256 _amount, uint256 workIndex) external {
        require(authors[_author].registered, "Author not registered");
        require(_amount > 0, "Tip must be greater than 0");
        require(workIndex < authors[_author].works.length, "Invalid work index");

        require(tipToken.transferFrom(msg.sender, _author, _amount), "Token transfer failed");

        authors[_author].works[workIndex].totalTips += _amount;
        authors[_author].totalTips += _amount;

        emit TipSent(msg.sender, _author, _amount);
    }

    function updateBio(string calldata _newBio) external onlyRegistered {
        authors[msg.sender].bio = _newBio;
        emit BioUpdated(msg.sender, _newBio);
    }

    function submitWork(string calldata _title, string calldata _content) external onlyRegistered {
    uint256 newId = workIdCounter++;
    authors[msg.sender].works.push(Work(newId, _title, _content, 0, msg.sender));
    emit WorkSubmitted(msg.sender, newId, _title, _content);
}


    function deleteWork(uint256 workId) external onlyRegistered {
    Work[] storage works = authors[msg.sender].works;
    bool found = false;

    for (uint256 i = 0; i < works.length; i++) {
        if (works[i].id == workId) {
            // Geser elemen setelahnya ke kiri
            for (uint256 j = i; j < works.length - 1; j++) {
                works[j] = works[j + 1];
            }
            works.pop();
            found = true;
            emit WorkDeleted(msg.sender, workId);
            break;
        }
    }

    require(found, "Work not found or not owned by caller");
    }

    function updateWork(uint256 workId, string calldata newTitle, string calldata newContent) external onlyRegistered {
    Work[] storage works = authors[msg.sender].works;
    bool found = false;

    for (uint256 i = 0; i < works.length; i++) {
        if (works[i].id == workId) {
            works[i].title = newTitle;
            works[i].content = newContent;
            found = true;
            emit WorkUpdated(msg.sender, workId, newTitle, newContent);
            break;
        }
    }

    require(found, "Work not found or not owned by caller");
    }


    function getAuthor(address _author)
        external
        view
        returns (
            address authorAddress,
            string memory name,
            string memory bio,
            uint256 totalTips,
            Work[] memory works
        )
    {
        Author storage author = authors[_author];
        return (author.authorAddress, author.name, author.bio, author.totalTips, author.works);
    }

    function getAllAuthorsBasicInfo()
        external
        view
        returns (
            address[] memory addresses,
            string[] memory names,
            string[] memory bios,
            uint256[] memory totalTips
        )
    {
        uint256 len = authorAddresses.length;
        addresses = new address[](len);
        names = new string[](len);
        bios = new string[](len);
        totalTips = new uint256[](len);

        for (uint256 i = 0; i < len; i++) {
            Author storage a = authors[authorAddresses[i]];
            addresses[i] = a.authorAddress;
            names[i] = a.name;
            bios[i] = a.bio;
            totalTips[i] = a.totalTips;
        }
    }

    function getAllAuthorsWorks() external view returns (Work[] memory works, address[] memory owners) {
        uint256 totalWorks = 0;
        for (uint256 i = 0; i < authorAddresses.length; i++) {
            totalWorks += authors[authorAddresses[i]].works.length;
        }

        works = new Work[](totalWorks);
        owners = new address[](totalWorks);
        uint256 index = 0;

        for (uint256 i = 0; i < authorAddresses.length; i++) {
            address authorAddr = authorAddresses[i];
            Work[] storage authorWorks = authors[authorAddr].works;
            for (uint256 j = 0; j < authorWorks.length; j++) {
                works[index] = authorWorks[j];
                owners[index] = authorAddr;
                index++;
            }
        }
    }

    function rankWorks(address _author) external view returns (Work[] memory) {
        Author storage author = authors[_author];
        Work[] memory worksCopy = new Work[](author.works.length);

        for (uint256 i = 0; i < author.works.length; i++) {
            worksCopy[i] = author.works[i];
        }

        for (uint256 i = 0; i < worksCopy.length; i++) {
            for (uint256 j = i + 1; j < worksCopy.length; j++) {
                if (worksCopy[i].totalTips < worksCopy[j].totalTips) {
                    Work memory temp = worksCopy[i];
                    worksCopy[i] = worksCopy[j];
                    worksCopy[j] = temp;
                }
            }
        }

        return worksCopy;
    }

    function getAllWorks() external view returns (Work[] memory) {
        uint256 totalWorks = 0;
        for (uint256 i = 0; i < authorAddresses.length; i++) {
            totalWorks += authors[authorAddresses[i]].works.length;
        }

        Work[] memory allWorks = new Work[](totalWorks);
        uint256 index = 0;
        for (uint256 i = 0; i < authorAddresses.length; i++) {
            Author storage a = authors[authorAddresses[i]];
            for (uint256 j = 0; j < a.works.length; j++) {
                allWorks[index++] = a.works[j];
            }
        }

        return allWorks;
    }

    function getWorksByAuthor(address _author) external view returns (Work[] memory) {
        require(authors[_author].registered, "Author not registered");
        return authors[_author].works;
    }

    function getAuthorAddresses() external view returns (address[] memory) {
        return authorAddresses;
    }
}