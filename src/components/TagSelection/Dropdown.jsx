import React from 'react';


const Dropdown = ({ list, addItem }) => {
    return (<div id="dropdown" className="w-full bg-white rounded shadow-card absolute z-10 top-12">
        <div className="flex flex-col w-full p-3">
            {list.map((item, key) => {
                return <div key={key}
                    className="w-full rounded cursor-pointer hover:bg-primary-200"
                    onClick={() => addItem(item)}>
                    <div className="relative flex items-center w-full p-2 pl-2" >
                        <div className="flex items-center w-full">
                            <div className="mx-2 text-sm font-medium leading-6 text-neutral-1000 font-Montserrat ">
                                {item?.text}
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>);

};

export default Dropdown;