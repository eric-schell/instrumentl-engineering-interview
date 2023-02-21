class AddReceivedAwardsCountToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :received_awards_count, :integer
  end
end
