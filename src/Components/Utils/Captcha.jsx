import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onCaptchaVerify }) => {
  function onChange(value) {
    if (value) {
      onCaptchaVerify();
    }
  }

  return (
    <div>
      <ReCAPTCHA
        sitekey="6Lc4zfopAAAAAFaT2pi-hKfU_hDCtUHp2cBrTKUL"
        onChange={onChange}
      />
    </div>
  );
};

export default Captcha;
