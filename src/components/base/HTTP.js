import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import HttpMethod from "../../constants/HttpMethod";
import history from "./../../history";

const Axios = (function () {
  let instance;

  function createInstance() {
    return axios.create({
      baseURL: "http://localhost:8080",
    });
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      console.log(getToken());
      if (getToken() !== "Bearer null") {
        instance.defaults.headers.common["Authorization"] = getToken();
      }
      instance.all = axios.all;

      return instance;
    },
  };
})();

Axios.getInstance().interceptors.response.use(
  (response) => {
    response.ok = response.status >= 200 && response.status < 300;
    return response;
  },
  async (error) => {
    const {
      response: { status, data },
    } = error;

    if (status === 404) {
      history.push("/error/not-found", { message: data.message });
    } else if (status === 500) {
    } else if (status === 403) {
      history.push("/error/forbidden");
    } else if (status === 401) {
      toast.error("You are not authorized for this service", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (status === 400) {
      toast.error(data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    return error;
  }
);

export async function request(
  url,
  data = [],
  method = HttpMethod.GET,
  options = {}
) {
  try {
    return await connect(url, data, method, options);
  } catch {}
}

export async function connect(url, data, method, options) {
  switch (method) {
    case HttpMethod.GET: {
      return await Axios.getInstance().get(url, options);
    }
    case HttpMethod.POST: {
      return await Axios.getInstance().post(url, data, options);
    }
    case HttpMethod.PUT: {
      return await Axios.getInstance().put(url, data, options);
    }
    case HttpMethod.DELETE: {
      return await Axios.getInstance().delete(url, options);
    }
    default: {
      return null;
    }
  }
}

// Ovo pravi query parametre jedan za drugim
export function makeParametersList(parameters) {
  let parametersList = "?";

  console.log("PARAMETERS");
  console.log(parameters);

  Object.keys(parameters).map(
    (key, index) =>
      (parametersList += parameters[key] ? `${key}=${parameters[key]}&` : "")
  );

  return parametersList === "?" ? "" : parametersList;
}

// Preuzimanje tokena iz local storage
export function getToken() {
  return "Bearer " + localStorage.getItem("token");
}

export function getUserFromLocalStorage() {
  let user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
