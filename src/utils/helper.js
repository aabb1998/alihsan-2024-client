import { isValidPhoneNumber } from "libphonenumber-js";
import * as XLSX from "xlsx";
import { SnackMessages } from "../components/Toast";

const {  showErrorMessage } = SnackMessages();

export function getCountryLengths(phoneNumber, country) {
  return isValidPhoneNumber(phoneNumber, country.toUpperCase());
}

export function formatPrice(price) {
  return !isNaN((price = parseFloat(price)))
    ? price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0";
}

export function getDateRange(option) {
  const currentDate = new Date();
  let startDate, endDate;

  switch (option) {
    case "today":
      startDate = new Date(currentDate);
      endDate = new Date(currentDate);
      break;
    case "yesterday":
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 1);
      endDate = new Date(startDate);
      break;
    case "this_week":
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
      endDate = new Date(currentDate);
      break;
    case "last_week":
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDate.getDay() - 7);
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      break;
    case "past_two_weeks":
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 14);
      endDate = new Date(currentDate);
      break;
    case "this_month":
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      break;
    case "last_month":
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      break;

    case "this_year":
      startDate = new Date(currentDate.getFullYear(), 0, 1);
      endDate = new Date(currentDate.getFullYear(), 11, 31);
      break;
    default:
      startDate = null;
      endDate = null;
  }

  startDate = new Date(startDate).toISOString().split("T")[0];
  endDate = new Date(endDate).toISOString().split("T")[0];
  return { startDate, endDate };
}

export const handleDownload = async (doc) => {
  try {
    const response = await fetch(doc);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = "document.pdf";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};

export const exportData = (data, fileName) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const makeSlug = (title) => {
  let slug = "";
  for (const i of title.matchAll(/[a-z0-9\s]/gi)) {
    slug += i[0] === " " ? "-" : i[0].toLowerCase();
  }
  return slug;
};

export const validateSlug = (slug) => {
  if (/[^a-z0-9-_]/.test(slug))
    return "Only lower case alphabets, numbers, hyphens (-) and underscores (_) are allowed";
  return "";
};

export const retrieveUserInfo = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return isLoggedIn ? JSON.parse(isLoggedIn) : { token: null, role: null };
};

// export const checkAdminPermission = () => {
//   const { role } = retrieveUserInfo();
//   if (role === "ADMIN") {
//     showErrorMessage("Admin does not have permission ");
//     return;
//   }
// };

export const checkAdminPermission = () => {
  const { role } = retrieveUserInfo();
  
  if (role === "ADMIN") {
    showErrorMessage("Admin does not have permission ");

    throw new Error("User is an admin and does not have permission.");
  }
};


export const getRecurringLabel = (periodDays) => {
  switch (parseInt(periodDays)) {
    case 7:
      return "Weekly";
    case 30:
      return "Monthly";
    case 365:
      return "Yearly";
    case 1:
      return "Daily";
    case 10:
      return "10 Days";
    default:
      return "";
  }
};