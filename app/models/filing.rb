class Filing < ApplicationRecord
  has_many :awards, dependent: :destroy
  belongs_to :organization
end
