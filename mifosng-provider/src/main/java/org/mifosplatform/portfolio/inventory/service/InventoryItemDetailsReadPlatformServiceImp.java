package org.mifosplatform.portfolio.inventory.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;
import java.util.List;

import org.joda.time.LocalDate;
import org.mifosplatform.infrastructure.core.domain.JdbcSupport;
import org.mifosplatform.infrastructure.core.service.TenantAwareRoutingDataSource;
import org.mifosplatform.portfolio.inventory.data.InventoryItemDetailsData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
public class InventoryItemDetailsReadPlatformServiceImp implements InventoryItemDetailsReadPlatformService {

	
	private final JdbcTemplate jdbcTemplate;
	
	@Autowired
	InventoryItemDetailsReadPlatformServiceImp(final TenantAwareRoutingDataSource dataSource){
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	/*private Long id;
	private Long itemMasterId; item_master_id
	private String serialNumber; serial_no
	private Long grnId;grn_id
	private String provisioningSerialNumber; provisioning_serialno
	private String quality; quality
	private String status; status
	private Long officeId; office_id
	private Long clientId; client_id
	private Long warranty; warranty
	private String remarks; remarks
	private Long createdById; createdby_id
	private Date createdDate; created_date
	private Date lastModifiedDate; lastmodified_date
	private Long lastModifiedDateById; lastmodifiedby_id
	*/
	
	private class ItemDetailsMapper implements RowMapper<InventoryItemDetailsData>{

		@Override
		public InventoryItemDetailsData mapRow(ResultSet rs, int rowNum) throws SQLException {
			Long id = rs.getLong("id");
			Long itemMasterId = rs.getLong("itemMasterId");
			String serialNumber = rs.getString("serialNumber");
			Long grnId = rs.getLong("grnId");
			String provisioningSerialNumber = rs.getString("provisioningSerialNumber");
			String quality= rs.getString("quality");
			String status = rs.getString("status");
			Long warranty = rs.getLong("warranty");
			String remarks = rs.getString("remarks");
	
			return new InventoryItemDetailsData(id,itemMasterId,serialNumber,grnId,provisioningSerialNumber,quality,status,warranty,remarks);
		}
		public String schema(){
			String sql = "id as id,item_master_id as itemMasterId,serial_no as serialNumber,grn_id as grnId,provisioning_serialno as provisioningSerialNumber,quality as quality,status as status, warranty as warranty,remarks as remarks from item_detail";
			return sql;
		}
		
	}



	@Override
	public List<InventoryItemDetailsData> retriveAllItemDetails() {
		// TODO Auto-generated method stub
		ItemDetailsMapper itemDetails = new ItemDetailsMapper();
		String sql = "select "+itemDetails.schema();
		return this.jdbcTemplate.query(sql, itemDetails, new Object[] {});
	}


	@Override
	public InventoryItemDetailsData retriveIndividualItemDetails() {
		// TODO Auto-generated method stub
		return null;
	}

}
