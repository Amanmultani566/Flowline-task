import React, { useState } from 'react'
import logo from '../assets/logo-mobile.svg'
import iconDown from '../assets/icon-chevron-down.svg';
import iconUp from '../assets/icon-chevron-up.svg';
import elipsis from '../assets/icon-vertical-ellipsis.svg'
import HeaderDropdown from './HeaderDropdown';
import AddEditBoardModal from '../modals/AddEditBoardModal';
import AddEditTaskModal from '../modals/AddEditTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import ElipsisMenu from './ElipsisMenu';
import DeleteModal from '../modals/DeleteModal';
import boardsSlice from '../redux/boardsSlice';

const Header = ({ setIsBoardModalOpen, isBoardModalOpen}) => {

    const dispatch = useDispatch()

    const [openDropdown , setOpenDropdown] = useState(false)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const [openAddEditTask , setOpenAddEditTask] = useState(false)

    const [isElipsisOpen, setIsElipsisOpen]  = useState(false)
    
    const [ boardType, setBoardType] = useState('add')

    const boards = useSelector( (state) => state.boards)

    const board = boards.find( board => board.isActive)

    

    const setOpenEditModal = () => {
        setIsBoardModalOpen(true)
        setIsElipsisOpen(false)
    }

    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true)
        setIsElipsisOpen(false)
    }

    const onDeleteBtnClick = () => {
        dispatch(boardsSlice.actions.deleteBoard())
        dispatch(boardsSlice.actions.setBoardActive({index : 0}))
        setIsDeleteModalOpen(false)
    }

    const onDropdownClick = () => {
        setOpenDropdown( state => !state)
        setIsElipsisOpen(false)
        setBoardType('add')

    }


  return (
    <div className=' p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0  '>

        <header className=' flex justify-between dark:text-white items-center'>

        {/* Left Side */}

        <div className=' flex items-center space-x-2 md:space-x-4'>
            <img src={logo} alt="Logo" className=' h-6 w-6  ' />
            <h3 className=' hidden md:inline-block font-bold font-sans md:text-4xl ' >
                FlowLine
            </h3>
            <div className=' flex items-center '>
                <h3 className=' truncate max-w-[200px] md:text-2xl font-bold md:ml-20 font-sans '>
                    {board.name}
                </h3>
                <img src={openDropdown ? iconUp : iconDown} alt="dropdown"
                className=' w-3 ml-2 md:hidden cursor-pointer'
                onClick={onDropdownClick}
                />
            </div>
        </div>

        {/* Right Side  */}

        <div className=' flex space-x-4 items-center md:space-x-4'>
            <button className=' hidden md:block button'
            onClick={
                () => {
                setOpenAddEditTask( (state) => !state)
            }}
            >
                Add new task button
            </button>

            <button className=' button py-1 px-3 md:hidden'
            onClick={
                () => {
                setOpenAddEditTask( (state) => !state)
            }}
            >
            +
            </button>

            <img src={elipsis} alt='elipsis'
            className=' cursor-pointer h-6'
            onClick={() =>{
                setBoardType('edit')
                setOpenDropdown(false)
                setIsElipsisOpen((state) => !state)
            }}
            />

            {
                isElipsisOpen && <ElipsisMenu  type='Boards'
                setOpenDeleteModal={setOpenDeleteModal}
                setOpenEditModal={setOpenEditModal}
                />
            }

        </div>

        </header>

        {openDropdown && <HeaderDropdown setIsBoardModalOpen={setIsBoardModalOpen} setOpenDropdown={setOpenDropdown} /> }

        {
            isBoardModalOpen && <AddEditBoardModal type={boardType}  setIsBoardModalOpen={setIsBoardModalOpen}/>
        }

        {
            openAddEditTask && <AddEditTaskModal device='mobile' type='add' setOpenAddEditTask={setOpenAddEditTask} />
        }
        {
            isDeleteModalOpen && <DeleteModal title={board.name} type='board' setIsDeleteModalOpen={setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick} />
        }

    </div>
  )
}

export default Header