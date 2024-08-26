import axios from "axios";

const handelEcomMail = async (clientName, userName, clientEmail) => {
  try {
    const setMail = {
      to: clientEmail,
      subject: `E-commerce web plan`,
      html: `
              <p>
      Hello ${clientName},
      <br /><br />
      Greetings from DIGITAL MITRO.
      <br /><br />
      <h4>INTRODUCING "DIGITAL MITRO" WHICH IS THE RENOWNED & REGISTERED LEADING "GLOBAL" BASED WEB DESIGNING & DEVELOPMENT, APPLICATION SOFTWARE & DIGITAL MARKETING ALONG WITH MOBILE APP (BOTH ANDROID & I-PHONE DEVELOPMENT). WE CATER OUR SERVICES GLOBALLY FOR ALL TYPES OF BUSINESS CLIENTS IN INDIA, NEW ZEALAND, AUSTRALIA, SINGAPORE, MALAYSIA, THAILAND, INDONESIA, PHILIPPINES IN SOUTH ASIA, & EUROPEAN COUNTRIES LIKE UNITED KINGDOM (SCOTLAND, WALES, ENGLAND) POLAND, HOLLAND, IRELAND, NORTHERN IRELAND, SPAIN, GERMANY, FRANCE, & THE WHOLE OF USA. WITHIN A SPAN OF JUST 5 YEARS, WE HAVE BEEN SUCCESSFUL IN DELIVERING WORLD CLASS COMMITTED SERVICES TO OUR ESTEEMED CLIENTS. THE DEDICATED TEAM OF OURS HAS ALWAYS HAD A BIG ROLE IN DEVELOPING, MAINTAINING AND SUPPORTING THE WEBSITE. EVENTUALLY, WITH TIME WE HAVE ROLLED INTO BECOMING AN ORGANIZATION WITH THE STRONGEST FOUNDATION OF MUTUAL TRUST AND HEALTHY BUSINESS RELATIONSHIP.</h4>

      <br />
      <br />
     <h4>* E-COMMERCE WEBSITE (DESIGN & COMPLETE DEVELOPMENT)</h4> 
      <br />
      <br /><br />
      Please note: Our business motive is to support you from your business aspect from every corner, gradually perform all the necessary works for all your online solutions and to take care completely from every aspect step by step in a sequence. So that we go ahead complete each work step by step and give you the desired results and in return you give us work step by step.


      <br /><br />
      <br />
      Please review the attached PDF Business Confidential Proposals for you in order to start the work on your website as we are going to take care of this website completely from start to end.
      <br />
      <h4>COMPLETE DETAILED WORK MODULES FOR THE DEVELOPMENT OF YOUR BUSINESS WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI LINGUISTICS LANGUAGE CONTENT.</h4>
      <br />
      <h4>E-COMMERCE WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI</h4>
      <br />
      <h4>E-COMMERCE WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI</h4>
      <br />
      <br />
      Number of  Pages 6
      <br />
     Subpages Unlimited
      <br />
      Number of Royalty Images 5
      <br />
      Number of Dynamic Banners 3
      <br />
      Responsive Website Design
      <br />
      Content Management System
      <br />
      Number of Additional Pages
      <br />
      Favicon
      <br />
      Contact Us Page
      <br />
      <br />
      <br />
      Google Map on Contact us Page
      <br />
      Support for Latest Browsers
      <br />
      Internet Explorer +10 Compatible
      <br />
      Google Chrome Compatible
      <br />
      Mozilla Firefox Compatible
      <br />
      Displaying Social Media Links
      <br />
      SEO Friendly URL Structure
      <br />
      Website Parameters Check
      <br />
      Phone Support & Consultation
      <br />
      Basic SEO
      <br />
      Basic SMO
      <br />
      Blog Management
      <br />
      Post Go Live Support
      <br />
      Serenity
      <br />
      Testimonial
      <br />
      Google Analytics Set-Up
      <br />
      Google Webmasters Set-Up
      <br />
      E-Mail Support & Consultation
      <br />
      <br />
      
      SERVICE MANAGEMENT FEATURES
      <br />
      <br />
      Gallery

      Product Showcase
      <br />
      Project
      <br />
      Portfolio
      <br />
      Testimonial
      <br />
      Newsletter
      <br />
      Document List
      <br />
      News
      <br/>
      <br/>
      PRODUCT MANAGEMENT SYSTEM
      <br/>
      Display feature product on home page
      <br/>
      Multiple images per product (Up to 10 max)
      <br/>
      Product image zoom-in capability
      <br/>
      Unlimited product attribute
      <br/>
      Attribute wise product price
      <br/>
      Product review & ratings
      <br/>
      Compare products
      <br/>
      Add products to Wish list
      <br/>
      Different price for different customer groups such as wholesalers and retailers.
      <br/>
      Related products
      <br/>
      Stock availability
      <br/>
      Send to a friend with email
      <br/>
      Share on Facebook
      <br/>
      Special offers
      <br/>
      <br/>
      <br/>
      <h5>CUSTOMER ACCOUNTS<h5/>
      <br/>
      <br/>    
      Address book with unlimited addresses
      <br/>    
      Wish list with ability to add comments
      <br/>    
      Order status and history
      <br/>    
      Recently ordered items
      <br/>    
      Default billing and shipping addresses
      <br/>    
      Newsletter subscription management
      <br/>    
      Product reviews submitted
      <br/>    
      <br/>    
      <h4>ANALYTICS AND REPORTING</h4>
      <br/>    
      <br/> 
      Admin dashboard for report overview
      <br/> 
      Sales report
      <br/> 
      Best viewed products report
      <br/> 
      Best purchased products report
      <br/> 
      Stock report
      <br/> 
      Search terms report
      <br/> 
      Product reviews report
      <br/> 
      message usage report
      <br/> 
      Total sales invoiced
      <br/> 
      Mobile Commerce
      <br/> Sales report
      <br/> 
      Best viewed products report
      <br/> 
      Best purchased products report
      <br/> 
      Stock report
      <br/> 
      Search terms report
      <br/> 
      Product reviews report
      <br/> 
      message usage report
      <br/> 
      Total sales invoiced
      <br/> 
      Mobile Commerce
      <br/> 
      <br/> 
      <br/> 
      <h4>PLEASE FEEL FREE TO CALL ON BELOW MENTIONED NUMBERS TO DISCUSS THE<h4/>
      <br/> 
      <h4>PROJECT AND TO UNDERSTAND YOUR BUSINESS REQUIREMENTS.<h4/>
      <br/>
      <a href="https://www.lillywhites.com/">https://www.lillywhites.com/</a>
      <br />
      <a href="https://www.gavins-garage.com/">https://www.gavins-garage.com/</a>
      <br />
      <a href="https://cashmere-suit.com/">https://cashmere-suit.com/</a>
      <br />
      <br /><br />
      Warm Regards,
      <br />
      <h2>${userName}</h2>
      <h4>Sales Executive, Digital Mitro.</h4>
      
      <div style="display: flex; align-items: center; gap:55px;">
      <img style="width: 30px; height: 18px;" src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0" alt="INDIA"/>
      <span>+91 81008 25310 (Whatsapp)|</span>
      <img style="width: 30px; height: 18px;" src="https://th.bing.com/th/id/R.fdb5e4205cc924e04bf6283e64e462c8?rik=%2fnOSihdqikVOOQ&riu=http%3a%2f%2fnouahsark.com%2fdata%2fimages%2finfocenter%2fworldwide%2fnorth_america%2fflags_big%2funited_states.png&ehk=zrThqMDFOGIcFqqgJOVToWxTlHPQPqwfmih%2f7CNjFH4%3d&risl=&pid=ImgRaw&r=0" alt="USA"/>
      <span>(1) +1 (512) 487 7639</span>
  </div>
  
      <br />
      <a style="color:'blue';" href="https://www.digitalmitro.com">https://www.digitalmitro.com</a>
      <br />
    
      <h4 style="font-weight:bold;">Unit No. 1420, Aurora Waterfront, GN 34/1, GN Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091</h4>
      <img style="width: 50%; height: auto;" src="https://digitalmitro.com/wp-content/uploads/2022/07/final__logo.png" alt="Signature Image"/>
      </p>
      `,
    };
    
    // Assuming you have a local server running to handle sending emails
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/send-email`, setMail);
  } catch (error) {
    console.error(error);
  }
};

export default handelEcomMail