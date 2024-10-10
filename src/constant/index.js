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
    address:"0x0000000000000000000000000000000000000000"
  },
  {
    id: 2,
    image: dai, 
    head: "DAI",
    desc: "Dai",
    address:"0x0000000000000000000000000000000000000000"
  },
  {
    id: 3,
    image: okbmodal, 
    head: "OKB",
    desc: "OKB",
    address:"0x0000000000000000000000000000000000000000"
  },
  {
    id: 4,
    image: usdc, 
    head: "USDC",
    desc: "USDC",
    address:"0x0000000000000000000000000000000000000000"
  },
  {
    id: 5,
    image: usdt,
    head: "USDT",
    desc: "Tether USD",
    address:"0x0000000000000000000000000000000000000000"
  },
  {
    id: 6,
    image: wbtc, 
    head: "WBTC",
    desc: "Wrapped Bitcoin",
    address:"0x0000000000000000000000000000000000000000"
  },
];

export default Options