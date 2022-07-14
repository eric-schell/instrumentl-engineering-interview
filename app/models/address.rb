class Address < ApplicationRecord
  belongs_to :organization
  belongs_to :award, optional: true
end
