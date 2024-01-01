function User(
    uid, username, about,
    firstName, lastName,
    email, country,
    street, city,
    state, zipcode,
    password, secret

) {
    this.uid = uid;
    this.username = username;
    this.about = about;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email,
    this.country = country,
    this.street = street,
    this.city = city,
    this.state = state,
    this.zipcode = zipcode,
    this.password = password,
    this.secret = secret
}

function Login(
    email, password,
    token
) {
    this.email = email;
    this.password = password;
    this.token = token;
}

export { User, Login };