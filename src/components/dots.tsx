export default function Dots({ top, bottom } : { top: boolean; bottom: boolean }) {
  const dotColors = ["red", "yellow", "green"]

  const topDots = (
    <>
      <div className="dotContainer">
        {dotColors.map((color) => (
          <div
            key={color}
            className="topDots"
            style={{ background: `${color}` }}
          />
        ))}
      </div>
    </>
  )

  const bottomDots = (
    <>
      <div className="bottomDots-container">
        {dotColors.map((e) => (
          <div className="bottomDots" key={e} />
        ))}
      </div>
    </>
  )

  return (
    <>
      {top && topDots}
      {bottom && bottomDots}
    </>
  )
}
