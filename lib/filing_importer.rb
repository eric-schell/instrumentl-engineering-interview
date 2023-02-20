require 'open-uri'

class FilingImporter
  FILING_URLS = %w[
    https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201612429349300846_public.xml
    https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201831309349303578_public.xml
    https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201641949349301259_public.xml
    https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201921719349301032_public.xml
    https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/202141799349300234_public.xml
    https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201823309349300127_public.xml
    https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/202122439349100302_public.xml
    https://filing-service.s3-us-west-2.amazonaws.com/990-xmls/201831359349101003_public.xml
  ]

  def self.import_all
    FILING_URLS.each do |filing_url|
      import(filing_url)
    end
  end

  def self.import(filing_url)
    hash = Hash.from_xml(URI.open(filing_url))
    return_timestamp = hash.dig('Return', 'ReturnHeader', 'ReturnTs')
    return_tax_period = hash.dig('Return', 'ReturnHeader', 'TaxPeriodEndDt')
    filer_ein = hash.dig('Return', 'ReturnHeader', 'Filer', 'EIN')
    filer_name = hash.dig('Return', 'ReturnHeader', 'Filer', 'BusinessName', 'BusinessNameLine1Txt')
    filer_address_line1 = hash.dig('Return', 'ReturnHeader', 'Filer', 'USAddress', 'AddressLine1Txt')
    filer_address_city = hash.dig('Return', 'ReturnHeader', 'Filer', 'USAddress', 'CityNm')
    filer_address_state = hash.dig('Return', 'ReturnHeader', 'Filer', 'USAddress', 'StateAbbreviationCd')
    filer_address_zipcode = hash.dig('Return', 'ReturnHeader', 'Filer', 'USAddress', 'ZIPCd')
    amended_return_indicator = hash.dig('Return', 'ReturnData', 'AmendedReturnInd')

    organization = Organization.find_by(ein: filer_ein) || Organization.create!(name: filer_name, ein: filer_ein)
    Address.find_or_create_by(
      organization: organization,
      address: filer_address_line1,
      city: filer_address_city,
      state: filer_address_state,
      country: 'US',
      zip_code: filer_address_zipcode
    )

    # skip this filing if there are existing filings for the same tax period that are newer
    return if Filing.where(organization: organization, tax_period: return_tax_period).where('return_timestamp > ?', return_timestamp).present?

    # destroy any existing filings for the same tax period with earlier (or the same) timestamp
    Filing.where(organization: organization, tax_period: return_tax_period).where('return_timestamp <= ?', return_timestamp).destroy_all

    filing = Filing.create!(
      organization: organization,
      tax_period: return_tax_period,
      xml_url: filing_url,
      return_timestamp: return_timestamp
    )

    (hash.dig('Return', 'ReturnData', 'IRS990ScheduleI', 'RecipientTable') || []).each do |recipient|
      recipient_ein = recipient.dig('RecipientEIN')
      recipient_name = recipient.dig('RecipientBusinessName', 'BusinessNameLine1Txt')
      recipient_address_line1 = recipient.dig('USAddress', 'AddressLine1Txt')
      recipient_address_city = recipient.dig('USAddress', 'CityNm')
      recipient_address_state = recipient.dig('USAddress', 'StateAbbreviationCd')
      recipient_address_zipcode = recipient.dig('USAddress', 'ZIPCd')
      recipient_grant_amount = recipient.dig('CashGrantAmt')
      recipient_grant_purpose = recipient.dig('PurposeOfGrantTxt')

      # skip recipients with invalid data
      next if recipient_ein.blank?

      receiver = Organization.find_by(ein: recipient_ein) || Organization.create!(name: recipient_name, ein: recipient_ein)
      award = Award.create!(filing: filing, receiver: receiver, cash_amount: recipient_grant_amount, purpose: recipient_grant_purpose)
      AwardAddress.create!(
        award: award,
        address: Address.find_or_create_by(
          organization: receiver,
          address: recipient_address_line1,
          city: recipient_address_city,
          state: recipient_address_state,
          country: 'US',
          zip_code: recipient_address_zipcode
        )
      )
    end
  end
end
