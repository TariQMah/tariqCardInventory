// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      "mongodb+srv://tariq:tariqmongodb123@cluster0-zvshr.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "<insert-jwt-secret>",
    CLOUDINARY_URL: "<insert-cloudinary-url>",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
