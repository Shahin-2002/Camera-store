import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer class="footer-light text-dark mt-5">
        <div class="container py-4">
          <div class="row">
            <div class="col-md-4 mb-3">
              <h5>درباره ما</h5>
              <p>ما ارائه‌دهنده بهترین سیستم‌های امنیتی و نظارتی هستیم.</p>
            </div>

            <div class="col-md-2 mb-3">
              <h6>لینک‌ها</h6>
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="footer-link">
                    خانه
                  </a>
                </li>
                <li>
                  <a href="#" class="footer-link">
                    محصولات
                  </a>
                </li>
                <li>
                  <a href="#" class="footer-link">
                    تماس با ما
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-md-3 mb-3">
              <h6>اطلاعات تماس</h6>
              <p>۰۹۱۲۱۲۳۴۵۶۷</p>
              <p>info@example.com</p>
            </div>

            <div class="col-md-3 mb-3">
              <h6>عضویت در خبرنامه</h6>
              <input
                type="email"
                class="form-control form-control-sm"
                placeholder="ایمیل شما"
              />
              <button class="btn btn-primary btn-sm mt-2">عضویت</button>
            </div>
          </div>
          <div class="text-center mt-3 pt-3 border-top text-muted small">
            © 2025 تمام حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </>
  );
}
