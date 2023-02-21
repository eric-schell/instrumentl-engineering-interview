module Api
  class OrganizationsController < Api::BaseController
    before_action :ensure_json_request

    def index
      @organizations = Organization
      if org_params[:search].present?
        @organizations = @organizations.where(
          "name LIKE ?",
          "%#{org_params[:search]}%"
        )
      end
      @organizations = @organizations.with_filings if org_params[:with_filings].present? && org_params[:with_filings] != 'false'
      @organizations = @organizations.with_received_awards if org_params[:with_received_awards].present? && org_params[:with_received_awards] != 'false'

      respond_to do |format|
        format.json {
          render json: {
            organizations: @organizations.order(
                pagination_params[:order_by] => pagination_params[:sort_dir]
            ).page(
              pagination_params[:page].to_i
            ).per(
              pagination_params[:per_page]
            ),
            total_count: @organizations.count
          }
        }
      end
    end

    def show
      @organization = Organization.find(params[:id])

      respond_to do |format|
        format.json { render json: @organization }
      end
    end

    def default_order_by
      "name"
    end

    def org_params
      params.permit(:search, :with_filings, :with_received_awards)
    end
  end
end
