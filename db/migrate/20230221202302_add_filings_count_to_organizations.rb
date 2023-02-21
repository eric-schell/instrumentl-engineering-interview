class AddFilingsCountToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :filings_count, :integer
  end
end
