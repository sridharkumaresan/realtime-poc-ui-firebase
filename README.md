  # realtime-poc-ui

  UI for realtime application using latest Angular and Socket IO.

  # Header
  ## Sticky Header on scroll

  * Angular Logo | Department
  * Application
  * Policies links droplist
  * Help link
  * Hotlines Links - London, Americas, Hong Kong, Tokyo
  * User Profile Section


  ## Top Level filter
  ### Issuer

  * Issuer Identifier droplist
    * Values - Ticker, Bloomberg Equity Ticker, Bloomberg Debt Ticker, CUSIP, ESMI, ESMP, ISIN, Issuer Name, RIC CODE, SEDOL
    * Default - Issuer Name


  * Search Type droplist
    * Values - Begins With, Includes, Equals
    * Default - Begins With


  * User Input to search

  * Restriction Category multi select
    * Values -
      * All
      * Advisory / Regulatory
      * Advisory / Reputational
      * Full Restriction
      * Large Holdings
      * Miscellaneous
      * Offering / Allocated
      * Offering / Allocated
      * Offering / Debt Allocated
      * Offering / Equity Allocated
      * Offering / Pre-Pricing
      * Regulatory
    * Default - All


  * Restriction Type multi select with category
    * Values
      * All
      * Advisory / Regulatory
        * 14e-5 US Tender Offer Rules
        * HK Takeover Panel
        * Irish Takeover Panel
        * Restructuring
        * UK Takeover Panel
      * Advisory / Reputational
        * Advisory - Long Term
        * Advisory - Short Term
        * Advisory - Short Term (ex Trading)
        * Debt Tender
        * Equity Tender
      * Full Restriction
        * Full Restriction
      * Large Holdings
        * Large Holdings (Equity Accumulations)
        * Large Holdings (US)
        * Large Holdings (positions in excess of 0.10%)
      * Miscellaneous
        * Loans Restricted List
        * Miscellaneous
      * Offering / Allocated
        * Convertible Offering
        * Exchange Offering
      * Offering / Debt Allocated    
        * Debt Offering
      * Offering / Equity Allocated    
        * Block Trade
        * Equity Offering
        * Reg M
      * Offering / Pre-Pricing
        * Block Trade
        * Convertible Offering
        * Debt Offering
        * Debt Offering (ex Trading)
        * Exchange Offering
        * Reg M
      * Regulatory
        * Japanese Stabilization
        * Korean Equity Research  
    * Default - All


  * Tier droplist
    * High Risk
    * Standard Risk


  | Business Area |  Product Type ||
  | :---:   | :-: | :-: |
  |  | Equity | Debt |  
  | Research | Checkbox | Checkbox |  
  | Written Commentary | Checkbox | Checkbox |  
  | Alpha Capture  | Checkbox | Checkbox |  
  | Trading | Checkbox | Checkbox |  


  ### Security

  * Issuer Identifier DropList with Input
    * Values -
      * Ticker
      * ESMI
      * Issuer Name
    * Default - Issuer Name
    * Input to enter the value of selected Issuer Identifier

    * Security Identifier DropList with Input
      * Values -
        * CUSIP
        * ESMP
        * ISIN
        * RIC CODE
        * Security Name
        * SEDOL
        * Ticker
      * Default - Ticker
      * Input to enter the value of selected Security Identifier

    * Security Type DropList
      * Values -
        * CDS
        * Convertibles
        * Debt
        * Equity
        * Loans
        * Options
        * Preferred
        * Single Stock Futures
        * Warrants
      * Default - None

    * Tier Droplist
      * High Risk
      * Standard Risk

  ### Installing

  Install required node modules.

  ```
  npm install
  ```

  ## Running the tests

  Run the unit Testing.
  ```
  npm run test
  ```

  ## Running the app locally

  ```
  npm run start
  ```


  ## License

  This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

  ## Acknowledgments

  * Hat tip to anyone whose code was used
  * Inspiration
  * etc
