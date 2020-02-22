<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
      <div class="container">
        <a class="navbar-brand text-primary font-weight-bold" href="#">In Detail</a>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login'}">Application</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <header class="masthead vh-100">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12 col-md-8 text-left">
            <h1 class="font-weight-light">Now, learn with ease</h1>
            <p class="lead">Points at your fingertips</p>
            <p
              class="lead"
            >Learning current affairs is never goinf to be the same. Try our free app once and you will be amazed at the ease you can remember what's up</p>
            <p class="lead">Now, as an app for your phone.</p>
            <b-link
              :to="{ name: 'register'}"
              router-tag="button"
              class="btn btn-outline-secondary rounded-0"
            >Register for free</b-link>
          </div>
          <div class="d-none d-md-block col-md-4">
            <b-img class="mt-5" fluid right src="../assets/img/banner-img.png" alt srcset></b-img>
          </div>
        </div>
      </div>
    </header>

    <section class="fact-area my-5 py-5">
      <div class="container">
        <div class="fact-box">
          <div class="row align-items-center">
            <div class="col single-fact">
              <h2>500+</h2>
              <p>Total Downloads</p>
            </div>
            <div class="col single-fact">
              <h2>Rave</h2>
              <p>Positive Reviews</p>
            </div>
            <div class="col single-fact">
              <h2>50+</h2>
              <p>Daily Visitors</p>
            </div>
            <div class="col single-fact">
              <h2>100%</h2>
              <p>PWA Installs</p>
            </div>
            <div class="col single-fact">
              <h2>250+</h2>
              <p>Active Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="feature-area">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-6">
            <div class="section-title text-center">
              <h2>Unique Features</h2>
              <p>
                Only a user can develop the best app for another user. Being a developer of this app, and a regular user too, the needs of a user are understood and catered to on point.
              </p>
            </div>
          </div>
        </div>
        <div class="row py-5">
          <div class="col-lg-4 col-md-6">
            <div class="single-feature">
                <span class="lnr lnr-book"></span>
                <h3>Ease of Use</h3>
              	<p>Couple of Taps and then swipe for hours on the almost unlimited* content of the app</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="single-feature">
                <span class="lnr lnr-book"></span>
                <h3>Regular Updates</h3>
              	<p>The content is regularly updated, and all it takes is a single tap for the app in your phone to get updated</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="single-feature">
				<span class="lnr lnr-book"></span>
				<h3>Offline Support</h3>
              	<p>Once a set is opened, it is saved in your phone and can be viewed for your reading later, even offline</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="about-area my-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-5 home-about-left">
            <img class="img-fluid" src="../assets/img/iphone.png" alt />
          </div>
          <div class="offset-lg-1 col-lg-5 home-about-right">
            <h1>
              I Believe that
              <br />learning Current Affairs
              <br />is easy
            </h1>
            <p>
              Learning current affairs in bulleted points with just the needed data presented to the eyes makes learning both fast and fun.
            </p>
            <b-link :to="{ name: 'register'}" router-tag="button" class="btn btn-outline-secondary rounded-0">Give a try. It's Free!</b-link>
          </div>
          <div class="col-lg-6 home-about-right home-about-right2">
            <h1>
              I Believe that
              <br />a user/developer can 
              <br />give the best to users
            </h1>
            <p>
              I use this app on a daily basis not just to update content, but to consume it too. I have been learning current affairs using this app, and I can say my sectional performance has improved a lot in mocks.
            </p>
            <b-link :to="{ name: 'register'}" router-tag="button" class="btn btn-outline-secondary rounded-0">Give a try. It's Free!</b-link>
          </div>
          <div class="col-lg-5 home-about-left">
            <img class="img-fluid" src="../assets/img/iphone.png" alt />
          </div>
        </div>
      </div>
    </section>

    <footer class="footer-area mt-5 pt-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <h4 class="">App links</h4>
            <ul class="p-0 unstyled">
              <li><router-link class="nav-link" :to="{ name: 'login'}">Login</router-link></li>
              <li><router-link class="nav-link" :to="{ name: 'register'}">Register</router-link></li>
              <li><router-link class="nav-link" :to="{ name: 'resetpassword'}">Forgot Password</router-link></li>
            </ul>
          </div>
          <div class="col-lg-6 col-sm-6">
            <h4>About the creator</h4>
            <p>This app is maintained by me(Praveen Kalaiarasu), out of my own interest. If you come across any bugs, kindly let me know the details through <a href="mailto:dev@pravnkay.com">dev@pravnkay.com</a> </p>
          </div>
        </div>
        <div class="footer-bottom row align-items-center py-3">
          <p class="footer-text m-0 col-lg-6 col-md-12">App Design Copyrights - <a href="https://pravnkay.com" target="_blank">pravnkay.com</a>.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>

ul.unstyled{
	list-style: none;
}
.masthead {
  background: url("../assets/img/home-banner-bg.jpg");
  height: 100vh;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.fact-area .fact-box {
  box-shadow: 0px 20px 50px rgba(153, 153, 153, 0.2);
}

.single-fact {
  text-align: center;
  margin: 45px 0;
  padding: 8px 16px;
  border-right: 1px solid #ddd;
}
@media (max-width: 991px) {
  .single-fact {
    margin: 10px 0;
    padding: 8px 32px;
  }
}
.single-fact:last-child {
  border-right: 0;
}
.single-fact h2 {
  font-size: 36px;
  margin-bottom: 5px;
}
@media (max-width: 991px) {
  .single-fact h2 {
    font-size: 25px;
  }
}
.single-fact p {
  margin: 0;
  font-size: 14px;
}

.feature-area {
  position: relative;
}
.feature-area:after {
  content: "";
  position: absolute;
  right: 16%;
  bottom: -100px;
  z-index: -1;
  width: 340px;
  height: 340px;
  background: linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #46dbf9 50%,
    #204be3 100%
  );
  background: -webkit-linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #46dbf9 50%,
    #204be3 100%
  );
  background: -moz-linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #46dbf9 50%,
    #204be3 100%
  );
  background: -ms-linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #46dbf9 50%,
    #204be3 100%
  );
  background: -o-linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #46dbf9 50%,
    #204be3 100%
  );
}
@media (max-width: 991px) {
  .feature-area:after {
    display: none;
  }
}
.feature-area .single-feature {
  background: #fff;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
}
@media (max-width: 991px) {
  .feature-area .single-feature {
    margin-bottom: 30px;
  }
}
.feature-area .single-feature h3 {
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  font-size: 21px;
}
.feature-area .single-feature .title .lnr {
  color: #fff;
  font-weight: 600;
  font-size: 24px;
  padding: 30px;
  display: inline-block;
  margin-bottom: 40px;
}
.feature-area .single-feature p {
  margin-bottom: 0px;
  margin-top: 20px;
}

.feature-area .single-feature:hover h3 {
  color: #46dbf9;
}

.about-area {
  position: relative;
  padding: 150px 0 70px;
}
@media (max-width: 991px) {
  .about-area {
    padding: 20px 0 70px;
  }
}
.about-area .container:after {
  content: "";
  position: absolute;
  top: 10%;
  right: 36%;
  width: 68%;
  height: 68%;
  background: linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #f8fcff 50%,
    #fcfdff 100%
  );
  background: -webkit-linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #f8fcff 50%,
    #fcfdff 100%
  );
  background: -moz-linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #f8fcff 50%,
    #fcfdff 100%
  );
  background: -ms-linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #f8fcff 50%,
    #fcfdff 100%
  );
  background: -o-linear-gradient(
    to bottom right,
    transparent 0%,
    transparent 50%,
    #f8fcff 50%,
    #fcfdff 100%
  );
  z-index: -1;
}
@media (max-width: 991px) {
  .about-area .container:after {
    content: none;
  }
}

.home-about-left img {
  width: 100%;
}
@media (max-width: 991px) {
  .home-about-left img {
    display: none;
  }
}

.home-about-right h1 {
  padding: 20px 0;
}
@media (max-width: 413px) {
  .home-about-right h1 {
    font-size: 30px;
  }
  .home-about-right h1 br {
    display: none;
  }
}
.home-about-right p {
  margin-bottom: 40px;
}

@media (max-width: 991px) {
  .home-about-right2 {
    margin-top: 50px;
  }
}

/* .footer-area {
  background: #222222;
}
@media (max-width: 991px) {
  .footer-area .single-footer-widget {
    margin-bottom: 30px;
  }
}
.footer-area .single-footer-widget h4 {
  color: #fff;
  margin-bottom: 35px;
}
@media (max-width: 1024px) {
  .footer-area .single-footer-widget h4 {
    font-size: 18px;
  }
}
@media (max-width: 991px) {
  .footer-area .single-footer-widget h4 {
    margin-bottom: 15px;
  }
}
.footer-area .single-footer-widget ul li {
  margin-bottom: 15px;
}
.footer-area .single-footer-widget ul li a {
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  color: #777777;
}
.footer-area .single-footer-widget ul li a:hover {
  color: #fff;
}
.footer-area .single-footer-widget .form-wrap {
  margin-top: 25px;
}
.footer-area .single-footer-widget input {
  height: 40px;
  border: none;
  width: 80% !important;
  font-weight: 300;
  background: #f9f9ff;
  color: #222222;
  padding-left: 20px;
  border-radius: 0;
  font-size: 14px;
  padding: 10px;
}
.footer-area .single-footer-widget input:focus {
  outline: none;
}
.footer-area .single-footer-widget .click-btn {
  color: #fff;
  border-radius: 0;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  padding: 8px 12px;
  border: 0;
}
.footer-area .single-footer-widget .click-btn span {
  font-weight: 500;
}
.footer-area .footer-bottom {
  margin-top: 90px;
}
@media (max-width: 991px) {
  .footer-area .footer-bottom {
    margin-top: 20px;
  }
}
.footer-area .footer-bottom .footer-text {
  color: #fff;
}
.footer-area .footer-bottom .footer-text a,
.footer-area .footer-bottom .footer-text span {
  color: #46dbf9;
}
.footer-area .footer-bottom span {
  font-weight: 700;
}
.footer-area .footer-bottom .footer-social {
  text-align: center;
}
@media (max-width: 991px) {
  .footer-area .footer-bottom .footer-social {
    text-align: left;
    margin-top: 30px;
  }
}
.footer-area .footer-bottom .footer-social a {
  background: #3e4876;
  margin-left: 5px;
  width: 40px;
  color: #fff;
  display: inline-grid;
  text-align: center;
  height: 40px;
  align-content: center;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}
.footer-area .footer-bottom .social-link {
  text-align: right;
}
@media (max-width: 991px) {
  .footer-area .footer-bottom .social-link {
    text-align: left;
    margin-top: 30px;
  }
}
.footer-area .footer-bottom .buttons p {
  font-size: 12px;
}
.footer-area .footer-bottom .buttons p span {
  font-size: 18px;
} */
</style>