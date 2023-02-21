class PopulateOrganizationCounts < ActiveRecord::Migration[7.0]
  def up
    Organization.find_each do |organization|
      Organization.reset_counters(organization.id, :filings)
      Organization.reset_counters(organization.id, :received_awards)
    end
  end

  def down
  end
end
