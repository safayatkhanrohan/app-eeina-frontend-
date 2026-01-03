
const FooterWave = () => {
  return (
    // {/* SVG Background Wave */}
      <div className="max-h-[612px] hidden xl:block absolute bottom-0 left-0 w-full z-0 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 612"
          className="w-full h-auto block relative"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M820 103.136C446.423 4.38648 203.436 25.4658 0.426337 222.768C-1.11493 224.265 -2 226.347 -2 228.496V604.136C-2 608.554 1.58171 612.136 5.99999 612.136H1430.89C1435.29 612.136 1438.86 608.607 1438.89 604.214C1441.28 304.374 1444.52 -21.7144 1438.83 1.1358C1431.65 29.9503 1208.37 205.796 820 103.136Z"
            fill="#5FA53C"
          />
        </svg>
      </div>
  )
}

export default FooterWave
