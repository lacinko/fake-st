import React, { useState, useRef, useEffect } from 'react'

interface IProps {
  open?: boolean
  title: string
  children: React.ReactNode
}

function Accordion({ open = false, children, title }: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(open)
  const activeCSS = isOpen ? 'text-blue-600' : 'text-gray-800'
  const [height, setHeight] = useState<number | undefined>(open ? undefined : 0)
  const ref = useRef<HTMLDivElement>(null)

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined

    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height)
    })
    resizeObserver.observe(ref.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [height, isOpen])

  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height)
    else setHeight(0)
  }, [isOpen])

  return (
    <>
      <div className="w-full rounded-md px-1 pb-6 text-left">
        <div>
          <button
            className={`${activeCSS} inline-flex w-full items-center justify-between gap-x-3 py-3 text-left font-semibold  transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400`}
            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
            onClick={handleFilterOpening}
          >
            <h6>{title}</h6>
            <div>
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>

        <div>
          <div
            className="overflow-hidden transition-[height] delay-200"
            style={{ height }}
          >
            <div ref={ref}>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Accordion
