import React from 'react'
import { Button } from '../../components'
import { MinusIcon, PlusIcon } from '../../theme/svg-icons'

export const FedyahTabs = ({ tabs, onChangeTabs, selectedTab, disabelButton, setDisabelButton, handleQuantityChange, quantity, handleAmount, formik }) => {

  return (
    <div className="flex flex-col gap-5 md:gap-7.5">
      <div className="flex flex-wrap gap-3 p-2 mb-3 rounded-lg bg-accent-100 md:mb-4">
        {tabs?.map((e, index) => (
          <Button
            key={index}
            label={e.tabName}
            value={e.tabName}
            type="button"
            name={e.tabName}
            onClick={onChangeTabs}
            variant={selectedTab?.tabName === e.tabName ? `primaryFull` : `secondaryTextFull`}
            className={"tab-btn flex-grow basis-0"}
          />
        ))}
      </div>
      {(selectedTab?.content1 || selectedTab?.content2) &&
        <div className='px-4 py-3 font-medium rounded-lg bg-neutral-200'>
          <h2 className='mb-2 font-bold'>{selectedTab?.head}</h2>
          {selectedTab?.content1 &&
            <p className='font-medium text-button-md text-neutral-800'>
              {selectedTab?.content1}</p>
          }
          {selectedTab?.content2 &&
            <p className='font-medium text-button-md text-neutral-800'>{selectedTab?.content2}</p>
          }
        </div>
      }
      {selectedTab?.generalDonation &&
        <div className='flex flex-col gap-2'>
          <div>

            <div className='flex flex-row gap-3'>
              <input type="checkbox" id="Anonymous" className="custom-checkbox"
                onChange={e => setDisabelButton(!disabelButton)}
                checked={disabelButton}
              //  disabled={disableAnonymous}
              />
              <label
                htmlFor="Anonymous"
                className="text-sm font-medium cursor-pointer text-neutral-1000"
              >
                General Donation (Optional)
              </label>
            </div>

          </div>
          <div className="grid grid-cols-4 gap-4 mb-5 md:mb-7.5">
            {selectedTab?.generalDonation && selectedTab?.amount?.map((amount, index) => (

              <div key={index} >
                <Button
                  type="button"
                  onClick={handleAmount}
                  value={amount}
                  label={`$${amount}`}
                  name="amount"
                  disabled={selectedTab?.generalDonation ? !disabelButton : false}
                  variant={"secondaryOutlineFull"}
                  className={amount === Number(formik.values.amount) ? "bg-primary-300 !text-white" : ""}
                />
              </div>

            ))}
          </div>
        </div>
      }

      {selectedTab?.calculateAmount && <div className="mb-7.5">
        {selectedTab?.initialAmount ? (
          <div className='flex items-baseline justify-between mb-7.5'>
            <div >
              <h4 className='mb-2 text-sm !font-medium text-neutral-1000'>{selectedTab?.initialAmountTitle}</h4>
              <div className="font-bold text-heading-4">${selectedTab?.initialAmount}</div>
            </div>

            <div className="">
              {selectedTab?.counter &&
                <div className="flex flex-col">
                  <h4 className='mb-2 text-sm !font-medium text-neutral-1000'>{selectedTab?.counterTitle}</h4>
                  <div className="relative flex flex-row w-auto bg-transparent rounded-lg h-11">
                    <button
                      onClick={(e) => handleQuantityChange(e, "sub")}
                      disabled={quantity === 1}
                      data-action="decrement"
                      className="flex items-center justify-center border border-r-0 rounded-l-lg w-11 h-11 border-neutral-300"
                    >
                      <span className="">
                        <MinusIcon />
                      </span>
                    </button>

                    <input
                      type="number"
                      className="border !rounded-none w-11 h-11 form-control !text-heading-7 !text-neutral-1000 !p-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      name="custom-input-number"
                      value={quantity}
                    />
                    <button
                      onClick={(e) => handleQuantityChange(e, "add")}
                      data-action="increment"
                      className="flex items-center justify-center border border-l-0 rounded-r-lg w-11 h-11 border-neutral-300"
                    >
                      <span className="">
                        <PlusIcon />
                      </span>
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="h-px mb-5 bg-neutral-300"></div>
        {selectedTab?.initialAmount ? (
          <div className="flex items-baseline justify-between gap-4 my-5">
            <div className="grow">{selectedTab?.itemTitle}</div>
            <div className='flex items-center justify-between gap-5 grow'>
              <div className="grow">{selectedTab?.counter ? quantity : selectedTab?.quantity}x</div>
              <div className="text-right grow">
                ${selectedTab?.initialAmount?.toLocaleString()}
              </div>
            </div>

          </div>
        ) : (
          ""
        )}
        {selectedTab?.initialAmount ? (
          <>
            <div className="h-px my-5 bg-neutral-300"></div>
            <div className="flex justify-between text-heading-7">
              <div>Subtotal</div>
              <div>${((selectedTab?.counter ? quantity : selectedTab?.quantity) * (selectedTab?.initialAmount))?.toLocaleString()}</div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>}
    </div>
  )
}

