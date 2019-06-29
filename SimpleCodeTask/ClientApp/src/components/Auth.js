
export default class Auth {

  static login(formData, callback) {
    fetch('api/auth/login', {
      method: "post",
      body: formData
    })
      .then(responce => {
        if (responce.status == 200)
          return responce.json();
      })
      .then(authData => {
        if (authData)
          localStorage.setItem("token", JSON.stringify(authData));
        else
          localStorage.removeItem("token");

        callback();
      });
  }

  static getLogged() {
    return Auth.getToken;
  }

  static getToken() {
    const payloadJson = localStorage.getItem("token");
    if (!payloadJson) return undefined;

    const payload = JSON.parse(payloadJson);
    const expires = new Date(payload.expires).getTime();
    const now = Date.now();

    const isExpired = now / 1000 > expires;

    if (isExpired)
      localStorage.removeItem("token");

    return !isExpired ? payload.token : undefined;
  }

  static getIsLogged() {
    return Auth.getToken() != undefined;
  }
}
