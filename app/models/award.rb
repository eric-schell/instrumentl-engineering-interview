class Award < ApplicationRecord
  belongs_to :filing
  belongs_to :receiver, class_name: "Organization"
  has_one :award_address
  has_one :address, through: :award_address
end
