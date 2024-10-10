import ethmodal from '../assets/images/ethmodal.png';
import dai from "../assets/images/dai.png";
import okbmodal from "../assets/images/okbmodal.png";
import usdc from "../assets/images/usdc.png";
import usdt from "../assets/images/usdt.png";
import wbtc from "../assets/images/wbtc.png";

const Options = [
  {
    id: 1,
    image: ethmodal, 
    head: "ETH",
    desc: "Ether",
    ETHaddress:"0x0000000000000000000000000000000000000000",
    Xaddress:"0x5a77f1443d16ee5761d310e38b62f77f726bc71c" //check
  },
  {
    id: 2,
    image: dai, 
    head: "DAI",
    desc: "Dai",
    ETHaddress:"0x6B175474E89094C44Da98b954EedeAC495271d0F",
    Xaddress:"0xc5015b9d9161dca7e18e32f6f25c4ad850731fd4"
    },
  {
    id: 3,
    image: okbmodal, 
    head: "OKB",
    desc: "OKB",
    ETHaddress:"0x75231F58b43240C9718Dd58B4967c5114342a86c",
    Xaddress:"0xe538905cf8410324e03a5a23c1c177a474d59b2b" //not orignal

  },
  {
    id: 4,
    image: usdc, 
    head: "USDC",
    desc: "USDC",
    ETHaddress:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    Xaddress:"0x74b7f16337b8972027f6196a17a631ac6de26d22"

  },
  {
    id: 5,
    image: usdt,
    head: "USDT",
    desc: "Tether USD",
    ETHaddress:"0xdAC17F958D2ee523a2206206994597C13D831ec7",
    Xaddress:"0x1e4a5963abfd975d8c9021ce480b42188849d41d"

  },
  {
    id: 6,
    image: wbtc, 
    head: "WBTC",
    desc: "Wrapped Bitcoin",
    ETHaddress:"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    Xaddress:"0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1"

  },
];

export default Options