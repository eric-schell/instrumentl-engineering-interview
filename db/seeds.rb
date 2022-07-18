# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
organization = Organization.create!(name: "Gabe's Org", ein: "123412345")
Address.create!(organization: organization, address: "123 1ST ST", city: "OAKLAND", state: "CA", country: "US", zip_code: "94611")

filing = Filing.create!(
  organization: organization,
  tax_period: "20201001",
  xml_url: "https://www.instrumentl.com",
  return_timestamp: "2020-04-15T13:12:23Z"
)

receiver = Organization.create!(name: "RECEIVER NAME")
award = Award.create!(filing: filing, receiver: receiver, cash_amount: 1234567, purpose: "For Fun")
AwardAddress.create!(
  award: award,
  address: Address.create!(
    organization: receiver,
    address: "123 FIRST STREET",
    city: "OAKLAND",
    state: "CA",
    country: "US",
    zip_code: "94611-1234"
  )
)
