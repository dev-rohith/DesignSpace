import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between font-bold text-white">
      <Link to="/"><img className="bg-balck w-30 ml-3" src="../../logo.svg" alt="" /> </Link>
      <ul className="hidden md:flex md:space-x-5 mr-6 uppercase text-sm font-medium text-(--dark)">
        <li className="group">
          <NavLink>our work</NavLink>
          <div className=' mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <div className="design-space-nav">

          </div>
          <NavLink>design space</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <NavLink to='/pricing'>pricing</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <NavLink>more</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <NavLink to="/login">login</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <NavLink to="/signup">signup</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
