class Award < ApplicationRecord
  belongs_to :filing
  belongs_to :receiver, class_name: "Organization", counter_cache: :received_awards_count
  has_one :award_address
  has_one :address, through: :award_address
end
