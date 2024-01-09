import Wrapper from "../wrappers/Navbar"
import { FaAlignLeft } from 'react-icons/fa'

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn">
          <FaAlignLeft/>
        </button>
      </div>
    </Wrapper>
  )
}
export default Navbar