import { useState, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import HeaderMain from '../../components/Headers/HeaderMain'
import HeaderTop from './HeaderTop'
 
import Modals from './Modals'
import { Footer } from '../../components/Footer'
import { getProjectsApi } from '../../features/projects/projectsApi'
import { Sidebar } from '../../components/Sidebar'

export default function HeaderParent () {
  const [isSidebar, setSidebar] = useState(true);
  const [ modalOptions, setModalOptions ] = useState(null)
  const navigate = useNavigate();
  const searchTimer = useRef(null);
  const [ searchState, setSearchState ] = useState({
    loading: false,
    text: '',
    results: [],
  })
  const [isOpen, setOpen] = useState(false);

  const onSearch = (text) => {
    setSearchState(s => ({ ...s, text, loading: true }))
    if(searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(async() => {
      searchTimer.current = null
      const result = await getProjectsApi({ search: text, page: 1, limit: 10 })
      setSearchState(s => {
        if(s.text!==text) return s;
        else return {text, loading: false, results: result.projects.rows}
      })
    }, 600)
  }

  const onSearchEnter = () => {
    setModalOptions(null)
    clearTimeout(searchTimer.current)
    setSearchState({ text: '', loading: false, results: [] })
    navigate('/projects', { state: { search: searchState.text } })
  }
  return (
    <>
      <div className="relative">
        <div className={`hidden${modalOptions?' md:block':''} absolute top-0 bottom-0 left-0 right-0 z-20`}
         onClick={() => setModalOptions(null)}>
        </div>
        <Sidebar setOpen={setOpen} isSidebar={isSidebar} setSidebar={setSidebar} />
        <header>
          <HeaderTop
            onSearch={onSearch} searchState={searchState} onSearchEnter={onSearchEnter}
            setModalOptions={setModalOptions} modalOptions={modalOptions}
            
          />
          <HeaderMain modalOptions={modalOptions} setModalOptions={setModalOptions} setSidebar={setSidebar} />
        </header>
        <Modals
          modalOptions={modalOptions} setModalOptions={setModalOptions}
          isOpen={isOpen} setOpen={setOpen}
        />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
