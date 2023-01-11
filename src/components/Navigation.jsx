import React, { useState } from 'react'

export const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState(0) 
  const handleOnclick = (index, e) => {
    e.preventDefault()
    setActiveIndex(index)
  }
  const menuItems =[
    {name:'Home', icon: 'far fa-bell', href: ''}, 
    {name:'Search', icon: 'far fa-bell', href: ''}, 
    {name:'Explore', icon: 'far fa-bell', href: ''}, 
    {name:'Messages', icon: 'far fa-bell', href: ''}, 
    {name:'Notifications', icon: 'far fa-bell', href: ''}, 
    {name:'Create', icon: 'far fa-bell', href: ''}, 
    {name:'Profile', icon: 'far fa-bell', href: ''},
    {name:'More', icon: 'far fa-bell', href: ''}
  ]

  const subMenuItems =[
    {name:'Settings', icon: 'far fa-bell', href: ''}, 
    {name:'Saved', icon: 'far fa-bell', href: ''}, 
    {name:'Your Activity', icon: 'far fa-bell', href: ''}, 
    {name:'Report a problem', icon: 'far fa-bell', href: ''}, 
    {name:'Switch accounts', icon: 'far fa-bell', href: ''}, 
    {name:'Log out', icon: 'far fa-bell', href: ''}, 
  ]
  
  const indexLastItem = menuItems.length - 1;

  const subMenus = subMenuItems.map((item, index) => {
    return (
      <li key={index} className={` ${activeIndex === index ? "active" : ""}`}
      >
        <a className="subMenu-item" href={item.href} onClick={(e) => { handleOnclick(index, e)}}>
          <p>{item.name}</p>
          <i className={item.icon}></i>
        </a>
      </li>
    )
  })

  const menus = menuItems.map((item, index) => {
    return (
      <>
        { index !== indexLastItem ? 
        <li key={index} className={`nav__link ${ activeIndex === index ? "active" : "" }`}>
          <a className="" href={item.href} onClick={(e) => {handleOnclick(index, e)}} >
            <i className={item.icon}></i>
            <p>{item.name}</p>
          </a>
        </li>
        : 
        <li key={index} className={`nav__link more-setting ${ activeIndex === index ? "active" : "" } `} onClick={ (e) => { handleOnclick(index, e) }}>
          <div className="input-action">
              <label for="toggle"><i className="far fa-bell"></i>{item.name}</label>
              <input type="checkbox" id="toggle"/>
              <div className="popup-actions">
                <ul className="actions" >{subMenus}</ul>
              </div>
            </div>
        </li>
      }
      </>
    )
  })

  return (
    <nav className="icu-side-nav">
      <div className="nav__container">
        <a className="nav__brand logo"  href="/"></a>
        <ul className="nav__items">
          {menus}
        </ul>
      </div>
    </nav>
  )
}
