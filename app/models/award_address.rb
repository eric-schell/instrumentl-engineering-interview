class AwardAddress < ApplicationRecord
  belongs_to :award
  belongs_to :address
end
