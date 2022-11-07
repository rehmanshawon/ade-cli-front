import toast from "react-hot-toast";
import moment from "moment";

export function timeDifference(dateFuture, dateNow) {
  let diffInMilliSeconds =
    (new Date(dateFuture).getTime() - new Date(dateNow).getTime()) / 1000;

  if (diffInMilliSeconds <= 0) {
    return toast.error("Please select correct time", {
      position: "bottom-right",
      duration: 4000,
    });
  }

  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hour = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hour * 3600;

  // calculate minutes
  const minute = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minute * 60;

  return { minute, hour, days };
}
