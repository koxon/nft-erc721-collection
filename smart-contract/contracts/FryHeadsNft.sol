// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import 'erc721a/contracts/ERC721A.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract FryHeadsNft is ERC721A, Ownable, ReentrancyGuard {

  using Strings for uint256;

  bytes32 public merkleRoot;
  mapping(address => bool) public whitelistClaimed;

  string public uriPrefix = '';
  string public uriSuffix = '.json';
  string public hiddenMetadataUri;
  
  uint256 public cost;
  uint256 public maxSupply;
  uint256 public maxMintAmountPerTx;

  bool public paused = true;
  bool public whitelistMintEnabled = false;
  bool public revealed = false;

  uint public donationCount = 0;
  struct charity {
    string name;
    address addr;
    uint count;
  }
  mapping(uint => charity) public charities;

  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    uint256 _cost,
    uint256 _maxSupply,
    uint256 _maxMintAmountPerTx,
    string memory _hiddenMetadataUri
  ) ERC721A(_tokenName, _tokenSymbol) {
    setCost(_cost);
    maxSupply = _maxSupply;
    setMaxMintAmountPerTx(_maxMintAmountPerTx);
    setHiddenMetadataUri(_hiddenMetadataUri);
    _initCharities();
  }

  // Event to debug charity withdraw
  event CharityWidthdraw(string name, address addr, uint count, uint256 toPay);

  // Fallbacks and plain transfer support
  uint x;
  uint y;
  fallback() external payable { x = 1; y = msg.value; }
  receive() external payable { x = 2; y = msg.value; }

  modifier mintCompliance(uint256 _mintAmount) {
    require(_mintAmount > 0 && _mintAmount <= maxMintAmountPerTx, 'Invalid mint amount!');
    require(totalSupply() + _mintAmount <= maxSupply, 'Max supply exceeded!');
    _;
  }

  modifier mintPriceCompliance(uint256 _mintAmount) {
    require(msg.value >= cost * _mintAmount, 'Insufficient funds!');
    _;
  }

  function _initCharities() internal onlyOwner {
    charities[0] = charity({
      name: "Environment",
      addr: 0x71c341d69eBd7B4ea781ca2F2A2a38837706EA85,
      count: 0
    });
    charities[1] = charity({
      name: "Civil & Human Rights",
      addr: 0xdA20057297daef660e16faE8c0603211014B9A7b,
      count: 0
    });
    charities[2] = charity({
      name: "Children & Youth",
      addr: 0xBA7D2fB9Ed22F4f107b8DaE362b60216Bea6e56e,
      count: 0
    });
    charities[3] = charity({
      name: "Poverty & Housing",
      addr: 0x7120c3b207bDef1C5869c2aefAf115Ed49a27Cc2,
      count: 0
    });
    charities[4] = charity({
      name: "Animals",
      addr: 0x501bEBF5283a24c5D6e52FB8C851fEC0ff5525C8,
      count: 0
    });
    charities[5] = charity({
      name: "Education",
      addr: 0x4362152ce9AC6619a484A5BDf362976909471b56,
      count: 0
    });
  }

  function whitelistMint(uint256 _mintAmount, uint8 _charityId, bytes32[] calldata _merkleProof) external payable mintCompliance(_mintAmount) mintPriceCompliance(_mintAmount) {
    // Verify whitelist requirements
    require(whitelistMintEnabled, 'The whitelist sale is not enabled!');
    require(!whitelistClaimed[_msgSender()], 'Address already claimed!');
    bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
    require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), 'Invalid proof!');

    whitelistClaimed[_msgSender()] = true;
    donationCount += 1;
    charities[_charityId].count += 1;
    _safeMint(_msgSender(), _mintAmount);
  }

  function mint(uint256 _mintAmount, uint8 _charityId) external payable mintCompliance(_mintAmount) mintPriceCompliance(_mintAmount) {
    require(!paused, 'The contract is paused!');

    donationCount += 1;
    charities[_charityId].count += 1;
    _safeMint(_msgSender(), _mintAmount);
  }
  
  function mintForAddress(uint256 _mintAmount, address _receiver) external mintCompliance(_mintAmount) onlyOwner {
    _safeMint(_receiver, _mintAmount);
  }

  function walletOfOwner(address _owner) external view returns (uint256[] memory) {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
    uint256 currentTokenId = _startTokenId();
    uint256 ownedTokenIndex = 0;
    address latestOwnerAddress;

    while (ownedTokenIndex < ownerTokenCount && currentTokenId < _currentIndex) {
      TokenOwnership memory ownership = _ownerships[currentTokenId];

      if (!ownership.burned) {
        if (ownership.addr != address(0)) {
          latestOwnerAddress = ownership.addr;
        }

        if (latestOwnerAddress == _owner) {
          ownedTokenIds[ownedTokenIndex] = currentTokenId;

          ownedTokenIndex++;
        }
      }

      currentTokenId++;
    }

    return ownedTokenIds;
  }

  function _startTokenId() internal view virtual override returns (uint256) {
    return 1;
  }

  function payableToCharity() public view returns (uint256) {
    return address(this).balance * 20 / 100;
  }

  function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
    require(_exists(_tokenId), 'ERC721Metadata: URI query for nonexistent token');

    if (revealed == false) {
      return hiddenMetadataUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, _tokenId.toString(), uriSuffix))
        : '';
  }

  function setRevealed(bool _state) external onlyOwner {
    revealed = _state;
  }

  function setCost(uint256 _cost) public onlyOwner {
    cost = _cost;
  }

  function setMaxMintAmountPerTx(uint256 _maxMintAmountPerTx) public onlyOwner {
    maxMintAmountPerTx = _maxMintAmountPerTx;
  }

  function setHiddenMetadataUri(string memory _hiddenMetadataUri) public onlyOwner {
    hiddenMetadataUri = _hiddenMetadataUri;
  }

  function setUriPrefix(string memory _uriPrefix) external onlyOwner {
    uriPrefix = _uriPrefix;
  }

  function setUriSuffix(string memory _uriSuffix) external onlyOwner {
    uriSuffix = _uriSuffix;
  }

  function setPaused(bool _state) external onlyOwner {
    paused = _state;
  }

  function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
    merkleRoot = _merkleRoot;
  }

  function setWhitelistMintEnabled(bool _state) external onlyOwner {
    whitelistMintEnabled = _state;
  }

  function withdraw() public onlyOwner nonReentrant {
    // We should always have donations if the contract has a positive balance
    if (donationCount > 0) {
      // Distribute funds to all charities with a count > 0
      for (uint i = 0; i < 6; i++) {
        if (charities[i].count == 0) {
          continue;
        }

        // What we need to send to this charity
        uint256 toPay = 0;
        toPay = payableToCharity() * (charities[i].count * 100 / donationCount) / 100;

        // Emit an event for logging
        emit CharityWidthdraw(charities[i].name, charities[i].addr, charities[i].count, toPay);

        (bool ch, ) = payable(charities[i].addr).call{value: toPay}('');  
        require(ch);
      }
    }

    // This will transfer the remaining contract balance to the owner.
    // Do not remove this otherwise you will not be able to withdraw the funds.
    // =============================================================================
    (bool os, ) = payable(owner()).call{value: address(this).balance}('');
    require(os);
    // =============================================================================
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return uriPrefix;
  }
}
