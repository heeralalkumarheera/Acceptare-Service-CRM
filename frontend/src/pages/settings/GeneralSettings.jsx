import React, { useState } from "react";

const GeneralSettings = () => {
  const [companyName, setCompanyName] = useState("ATPL CRM");

  const [logo, setLogo] = useState(null);
  const [icon, setIcon] = useState(null);
  const [banner, setBanner] = useState(null);

  const handleImage = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <h2>General Settings</h2>

      <div className="card">
        <h4>Company Info</h4>

        {/* COMPANY NAME */}
        <label>Company Name</label>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        {/* LOGO */}
        <label>Company Logo (210 × 50)</label>
        <div className="image-upload">
          {logo && <img src={logo} alt="logo" />}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, setLogo)}
          />
        </div>

        {/* ICON */}
        <label>Company Icon (50 × 50)</label>
        <div className="image-upload small">
          {icon && <img src={icon} alt="icon" />}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, setIcon)}
          />
        </div>

        {/* BANNER */}
        <label>Company Banner (1920 × 1080)</label>
        <div className="image-upload banner">
          {banner && <img src={banner} alt="banner" />}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, setBanner)}
          />
        </div>

        <button className="save-btn">Save Settings</button>
      </div>
    </>
  );
};

export default GeneralSettings;
