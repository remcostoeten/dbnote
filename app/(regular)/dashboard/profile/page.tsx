import React from "react"
import Image from "next/image"

import { Input } from "@/components/ui/input"

export default function page() {
  return (
    <div className="profile profile-v1">
      <div className="container container--dashboard">
        <div className="profile__title">
          <div className="profile__title-icon-wrapper"></div>
          <div className="profile__title-text">
            <h3 className="profile__title-text-1">Profile and Settings</h3>
            <p className="fd-md profile__title-text-2">Setup your profile</p>
          </div>
        </div>
        <div className="profile__container">
          <div className="profile__content">
            <div className="profile__contact-info">
              <div className="contact-info__photo-profile">
                <div className="photo-profile__group">
                  {/* <Image
                    src="../assets/media/images/profile-photo.png"
                    alt=""
                    width={80}
                    height={80}
                    className="photo-profile__group-photo"
                  /> */}
                  <div className="photo-profile__group-text">
                    <p className="fd-sm fd-sm--bold photo-profile__group-text-name">
                      John Doe
                    </p>
                    <p className="fb-sm photo-profile__group-text-email">
                      johndoe123@gmail.com
                    </p>
                  </div>
                </div>
                <div className="photo-profile__cta">
                  <button className="btn btn-primary btn-sm btn-pill">
                    Change Photo Profile
                  </button>{" "}
                  <button className="btn btn-secondary btn-sm">Delete</button>
                </div>
              </div>
              <div className="contact-info__name">
                <div className="contact-info__name-form">
                  <p className="fb-regular fb-regular--bold contact-info__name-form-text">
                    Username
                  </p>
                  <div className="d-block mini-form-sm__box contact-info__name-form-input">
                    <form className="mini-form">
                      <Input
                        className="form-control form-control-sm mini-form__input"
                        placeholder="John Doe"
                        autoComplete="off"
                      />
                    </form>
                  </div>
                </div>
                <div className="contact-info__name-form">
                  <p className="fb-regular fb-regular--bold contact-info__name-form-text">
                    Email
                  </p>
                  <div className="d-block mini-form-sm__box contact-info__name-form-input">
                    <form className="mini-form">
                      <Input
                        type="email"
                        className="form-control form-control-sm mini-form__input"
                        placeholder="johndoe123@gmail.com"
                        autoComplete="off"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="contact-info__crypto">
                <p className="fb-regular fb-regular--bold contact-info__crypto-text">
                  Crypto addresses
                </p>
                <div className="contact-info__crypto-group">
                  <div className="contact-info__crypto-group-coins">*/</div>
                </div>
              </div>
            </div>
            <div className="profile__personal-info">
              <div className="personal-info__name-form">
                <p className="fb-regular fb-regular--bold personal-info__name-form-text">
                  First name
                </p>
                <div className="d-block mini-form-sm__box personal-info__name-form-input">
                  <form className="mini-form">
                    <Input
                      className="form-control form-control-sm mini-form__input"
                      placeholder="John"
                      autoComplete="off"
                    />
                  </form>
                </div>
              </div>
              <div className="personal-info__name-form">
                <p className="fb-regular fb-regular--bold personal-info__name-form-text">
                  Last name
                </p>
                <div className="d-block mini-form-sm__box personal-info__name-form-input">
                  <form className="mini-form">
                    <Input
                      className="form-control form-control-sm mini-form__input"
                      placeholder="Doe"
                      autoComplete="off"
                    />
                  </form>
                </div>
              </div>
              <div className="personal-info__name-form personal-info__name-form--date">
                <p className="fb-regular fb-regular--bold personal-info__name-form-text">
                  Date of birth
                </p>
                <div className="d-block mini-form-sm__box personal-info__name-form-input">
                  <form className="mini-form">
                    <Input
                      id="datepicker-1"
                      className="form-control form-control-sm mini-form__input"
                      placeholder="10 / 21 / 2022"
                      autoComplete="off"
                    />
                  </form>
                </div>
              </div>
              <div className="personal-info__name-form personal-info__name-form--country">
                <p className="fb-regular fb-regular--bold personal-info__name-form-text">
                  Country of residence
                </p>
                <div className="d-block">
                  <div
                    className="forms-group forms-Select js-forms-Select"
                    id="custom-Select-form-1"
                  >
                    <div
                      className="forms-group__items Selected"
                      data-Selected="indonesia"
                    >
                      <p className="fb-regular fg-items__value">Indonesia</p>
                    </div>

                    <div className="forms-group__dropdown js-forms-group__dropdown">
                      <div
                        className="forms-group__items active"
                        data-Selected="indonesia"
                      >
                        <p className="fb-regular fg-items__value">Indonesia</p>
                      </div>
                      <div className="forms-group__items" data-Selected="usa">
                        <p className="fb-regular fg-items__value">USA</p>
                      </div>
                      <div className="forms-group__items" data-Selected="japan">
                        <p className="fb-regular fg-items__value">Japan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile__delete-account">
              <div className="delete-account__group">
                <p className="fb-regular fb-regular--bold delete-account__group-title">
                  Delete account
                </p>
                <p className="fb-regular delete-account__group-desc">
                  Closing your account can’t be undone. Please make sure your
                  account balance is $0.00 before you begin.
                </p>
              </div>
              <button className="btn btn-primary btn-sm btn-pill delete-account__btn">
                Delete Account Now
              </button>
            </div>
            <button className="btn btn-primary btn-lg btn-pill profile__save-btn">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
