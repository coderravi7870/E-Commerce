import React from 'react'
import styles from '../../styles/Styles'
import { navItems } from '../../static/Data'
import { Link, NavLink} from 'react-router-dom'

const Navbar = ({active}) => {
  return (
    
      <div className={`block 800px:${styles.noramlFlex}`}>
         {
            navItems && navItems.map((i,index) => (
                <div className="flex" key={index}>
                    <NavLink to={i.url}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#17dd1f] pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer"
                        : "text-black 800px:text-[#fff] pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer"
                    }
                    >
                    {i.title}
                    </NavLink>
                </div>
                // <div className="flex" key={index}>
                //     <Link to={i.url}
                //     className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
                //     >
                //     {i.title}
                //     </Link>
                // </div>
            ))
         }
    </div>
    
  )
}

export default Navbar
