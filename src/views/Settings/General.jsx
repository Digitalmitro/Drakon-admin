import React, { useState, useMemo } from 'react'
// import Select from 'react-select'
import { Select, message } from 'antd'
import countryList from 'react-select-country-list'
import { CitySelect, CountrySelect, StateSelect, LanguageSelect } from 'react-country-state-city'
import 'react-country-state-city/dist/react-country-state-city.css'
import { Button } from '@mui/material'
import axios from 'axios'
const General = () => {
  const Profile = localStorage.getItem('user')
  const NewProfile = JSON.parse(Profile)
  const user_id = NewProfile?._id

  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [EnableTax, setEnabletax] = useState(true)
  const [EnableCoupon, setEnablecoupon] = useState(true)
  const [Currency, setCurrency] = useState('')
  const [countryid, setCountryid] = useState(0)
  const [stateid, setstateid] = useState(0)
  const handleSave = async () => {
    const payload = {
      address,
      state,
      city,
      zip,
      EnableTax,
      EnableCoupon,
      Currency,
      user_id,
    }
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/general-settings`, payload)
    message.success(res.data.message)
  }

  const options = [
    { value: 'Sell to all countries', label: 'Sell to all countries' },
    {
      value: 'Sell to all countries, except for...',
      label: 'Sell to all countries, except for...',
    },
  ]

  const [selectedOption, setSelectedOption] = useState(options[0])
  const [ignoredCountries, setIgnoredCountries] = useState([])
  const currency = [
    { value: '$', label: 'USD' },
    { value: '€', label: 'EURO' },
    { value: '₹', label: 'INR' },
  ]
  const [selectedCurrency, setSelectedCurrency] = useState(currency[0])
  return (
    <>
      <h4>Store Address</h4>
      <p style={{ fontSize: '0.8rem' }}>
        This is where your business is located. Tax rates and shipping rates will use this address.
      </p>
      <div style={{ display: 'flex', gap: '150px', marginBottom: '50px' }}>
        <label htmlFor="address" style={{ fontWeight: 'bold' }}>
          Address
        </label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          name=""
          id="address"
          style={{
            borderRadius: '5px',
            border: '1px solid lightgray',
            outline: 'none',
            padding: '5px',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '150px', marginBottom: '50px' }}>
        <label htmlFor="country" style={{ fontWeight: 'bold' }}>
          Country
        </label>
        <CountrySelect
          onChange={(e) => {
            setCountryid(e.id)
          }}
          placeHolder="Select Country"
        />
      </div>
      <div style={{ display: 'flex', gap: '150px', marginBottom: '50px' }}>
        <label htmlFor="state" style={{ fontWeight: 'bold' }}>
          State
        </label>
        <StateSelect
          countryid={countryid}
          onChange={(e) => {
            setstateid(e.id)
            setState(e?.name)
          }}
          placeHolder="Select State"
        />
      </div>
      <div style={{ display: 'flex', gap: '150px', marginBottom: '50px' }}>
        <label htmlFor="city" style={{ fontWeight: 'bold' }}>
          City
        </label>
        <CitySelect
          countryid={countryid}
          stateid={stateid}
          onChange={(e) => {
            setCity(e?.name)
          }}
          placeHolder="Select City"
        />
      </div>
      <div style={{ display: 'flex', gap: '150px', marginBottom: '50px' }}>
        <label htmlFor="zipcode" style={{ fontWeight: 'bold' }}>
          Postcode / ZIP
        </label>
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          type="text"
          name=""
          id="zipcode"
          style={{
            borderRadius: '5px',
            border: '1px solid gray',
            outline: 'none',
            padding: '5px',
          }}
        />
      </div>

      <h4>General options</h4>
      <div style={{ display: 'flex', gap: '150px', marginBottom: '50px', marginTop: '25px' }}>
        <label htmlFor="zipcode" style={{ fontWeight: 'bold' }}>
          Selling location(s)
        </label>
        <Select
          style={{ width: '30%', height: '50px' }}
          options={options}
          onChange={(e) => setSelectedOption(e)}
          defaultValue={selectedOption.value}
        />
        {selectedOption === 'Sell to all countries, except for...' && (
          <Select
            mode="tags"
            placeholder="Select countries"
            onChange={(e) => {
              setIgnoredCountries(e)
            }}
            style={{
              width: '30%',
            }}
            options={[
              { value: 'USA', label: 'USA' },
              { value: 'Europe', label: 'Europe' },
              { value: 'Asia', label: 'Asia' },
              { value: 'MiddleEast', label: 'MiddleEast' },
            ]}
          />
        )}
      </div>
      <div class="mb-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }} htmlFor="tax">
          Enable taxes
        </label>
        <div>
          <div class="mb-3 form-check">
            <input
              onChange={(e) => setEnabletax(e.target.checked)}
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Enable tax rates and calculations
            </label>
          </div>
          <div id="emailHelp" class="form-text" style={{ fontSize: '12px' }}>
            We'll never share your email with anyone else.
          </div>
        </div>
      </div>
      <div class="mb-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }} htmlFor="tax">
          Enable coupons
        </label>
        <div>
          <div class="mb-3 form-check">
            <input
              onChange={(e) => setEnablecoupon(e.target.checked)}
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Enable the use of coupon codes
            </label>
          </div>
          <div id="emailHelp" class="form-text" style={{ fontSize: '12px' }}>
            Coupons can be applied from the cart and checkout pages.
          </div>
        </div>
      </div>

      <h4>Currency options</h4>
      <p style={{ fontSize: '12px' }}>
        The following options affect how prices are displayed on the frontend.
      </p>
      <div style={{ display: 'flex', gap: '150px', marginBottom: '50px', marginTop: '25px' }}>
        <label htmlFor="zipcode" style={{ fontWeight: 'bold' }}>
          Currency
        </label>
        <Select
        value={Currency}
          style={{ width: '30%', height: '50px' }}
          options={currency}
          onChange={(e) => {
            setSelectedCurrency(e)
            setCurrency(e)
          }}
          defaultValue={selectedCurrency.value}
        />
      </div>
      <Button onClick={handleSave} variant="outlined">
        Save changes
      </Button>
    </>
  )
}

export default General
