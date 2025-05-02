import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="footer-light text-dark mt-5">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>درباره ما</h5>
              <p>ما ارائه‌دهنده بهترین سیستم‌های امنیتی و نظارتی هستیم.</p>
            </div>

            <div className="col-md-2 mb-3">
              <h6>لینک‌ها</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="footer-link">
                    خانه
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    محصولات
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    تماس با ما
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-3">
              <h6>اطلاعات تماس</h6>
              <p>۰۹۱۲۱۲۳۴۵۶۷</p>
              <p>info@example.com</p>
            </div>

            <div className="col-md-3 mb-3">
              <h6>عضویت در خبرنامه</h6>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="ایمیل شما"
              />
              <button className="btn btn-primary btn-sm mt-2">عضویت</button>
            </div>
          </div>
          <div className="text-center mt-3 pt-3 border-top text-muted small">
            © 2025 تمام حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </>
  );
}
