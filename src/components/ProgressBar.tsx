import { Link, useLocation } from "react-router-dom";

function ProgressBar() {
  const location = useLocation();
  const stage = location.pathname.split("/")[2];
  const stageInt = parseInt(stage!);
  const progressBubbles = [1, 2, 3];
  const progressBubbleLabels = [
    "Basket",
    "Shipping & Payment",
    "Delivery Information",
  ];

  function setProgressBarWidth(stage: number) {
    switch (stage) {
      case 1:
        return "";
      case 2:
        return "w-[50%]";
      case 3:
        return "w-[90%]";
      default:
        return "";
    }
  }

  return (
    <div>
      <div className="relative mx-8 flex justify-between">
        <div className="absolute left-4 top-1/2 -z-10 h-2 w-[90%] bg-slate-100"></div>
        <div
          className={`${setProgressBarWidth(
            stageInt
          )} absolute left-4 top-1/2 -z-10 h-2 bg-blue-600`}
        ></div>
        {progressBubbles.map((bubble) => {
          const bubbleLabel = bubble < stageInt ? "✓" : bubble;
          const bubbleCSSBGColor =
            bubble <= stageInt
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-gray-500";
          return (
            <Link
              to={`/cart/${bubble}`}
              key={bubble}
              className={`${bubbleCSSBGColor} inline-flex h-[46px] w-[46px] items-center justify-center rounded-full text-2xl font-bold `}
            >
              {bubbleLabel}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;

/*
        <div className="mx-8 mt-4 flex justify-between">
            {progressBubbleLabels.map((label) => {
            return (
                <span className="w-10 text-center text-xs font-medium text-gray-500">
                {label}
                </span>
            );
            })}
        </div>
*/
