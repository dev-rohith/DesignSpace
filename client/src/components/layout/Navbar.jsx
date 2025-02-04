import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between font-bold text-white">
      <img className="bg-balck w-30 ml-3" src="../../logo.svg" alt="" />
      <ul className="hidden md:flex md:space-x-5 mr-6 uppercase text-sm font-medium text-black">
        <li className="group">
          <NavLink>our work</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <NavLink>design space</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <NavLink>pricing</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <NavLink>more</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <NavLink>login</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
        <li className="group">
          <NavLink>signup</NavLink>
          <div className='mx-2 group-hover:border-b group-hover:border-black-100'></div>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
