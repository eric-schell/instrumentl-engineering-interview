class Organization < ApplicationRecord
  validates :name, presence: true
  has_many :addresses
  has_many :filings
  has_many :received_awards, class_name: "Award", foreign_key: "receiver_id"
  has_many :awards, through: :filings

  scope :with_filings, -> { where('filings_count > 0') }
  scope :with_received_awards, -> { where('received_awards_count > 0') }
end
