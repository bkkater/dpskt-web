/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        100: "25rem",
      },
      backgroundImage: {
        texture: "url('/resources/bg-texture.png')",
        abstract: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1000%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='rgba(18%2c 18%2c 20%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c921.929C171.96%2c918.799%2c249.591%2c700.565%2c373.722%2c581.522C471.244%2c487.997%2c596.494%2c420.943%2c651.218%2c297.401C705.648%2c174.522%2c676.434%2c37.433%2c674.252%2c-96.943C671.728%2c-252.362%2c726.883%2c-425.216%2c637.42%2c-552.328C547.191%2c-680.528%2c372.882%2c-716.73%2c218.572%2c-744.387C75.535%2c-770.024%2c-63.472%2c-728.746%2c-206.596%2c-703.603C-369.132%2c-675.05%2c-560.931%2c-703.88%2c-677.418%2c-586.986C-794.37%2c-469.626%2c-803.829%2c-279.55%2c-793.988%2c-114.158C-785.221%2c33.193%2c-699.548%2c157.961%2c-625.497%2c285.655C-558.325%2c401.485%2c-476.437%2c499.804%2c-382.569%2c595.289C-262.587%2c717.338%2c-171.12%2c925.044%2c0%2c921.929' fill='%230e0e0f'%3e%3c/path%3e%3cpath d='M1920 1705.6280000000002C2033.442 1686.2179999999998 2107.383 1584.156 2207.35 1527.125 2314.739 1465.8600000000001 2475.094 1469.385 2529.074 1358.155 2582.897 1247.249 2499.587 1119.508 2462.17 1002.048 2430.522 902.7 2390.034 810.2860000000001 2327.881 726.569 2261.381 636.9970000000001 2194.985 538.725 2090.059 500.831 1982.838 462.10799999999995 1863.395 482.97799999999995 1755.529 519.864 1650.761 555.691 1563.1689999999999 624.3299999999999 1488.863 706.418 1413.27 789.928 1355.6680000000001 885.954 1325.8220000000001 994.5699999999999 1292.96 1114.164 1266.9099999999999 1242.311 1309.614 1358.754 1353.645 1478.816 1450.466 1574.424 1561.6480000000001 1637.607 1669.54 1698.921 1797.681 1726.557 1920 1705.6280000000002' fill='%23171719'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1000'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
      },
      keyframes: {
        fromTop: {
          from: {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fromLeft: {
          from: {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        fromTop: "fromTop 0.5s ease-out",
        fromLeft: "fromLeft 0.5s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
