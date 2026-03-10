
import { Table, Input, Select, DatePicker, Button, Tag, Modal, Spin, Space } from 'antd'
import { EyeOutlined, CalendarOutlined, InfoCircleOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { categoryOptions, categoryTags, missionsData, statusOptions, statusTags } from '../utils/services.missions';
import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import debounce from "lodash/debounce";
dayjs.extend(isBetween);
import { useMissions, useMissionById, useMissionAssign } from '../hooks/useMissions';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const tableColumns = (onView) => [
  {
    title: 'Mission ID',
    dataIndex: 'id',
    key: 'id',
    width: '6.25rem', 
    render: (text) => <span className="font-semibold text-gray-600">{text}</span>,
  },
  {
    title: 'Client Phone',
    dataIndex: 'clientPhone',
    key: 'clientPhone',
    width: '9.375rem', 
  },
  {
    title: 'Agent Phone',
    dataIndex: 'agentPhone',
    key: 'agentPhone',
    width: '9.375rem', 
    render: (text) => <span className={text === '-' ? 'text-gray-300' : ''}>{text}</span>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: '7.5rem', 
    render: (cat) => (
      <Tag color={categoryTags[cat]} className="rounded-md px-3 border-none font-medium">
        {cat}
      </Tag>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '8.125rem', 
    render: (status) => (
      <Tag color={statusTags[status]?.color} className="rounded-md px-3 font-medium">
        {statusTags[status]?.label || status}
      </Tag>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: '6.25rem', 
    render: (text) => <span className="font-semibold">{text}</span>,
  },
  {
    title: 'Express',
    dataIndex: 'express',
    key: 'express',
    width: '5.625rem', 
    render: (val) => (
      <Tag color={val === 'Yes' ? 'red' : 'default'} className="rounded-md px-2 border-none">
        {val}
      </Tag>
    ),
  },
  {
    title: 'Zone',
    dataIndex: 'zone',
    key: 'zone',
    width: '7.5rem', 
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
    width: '9.375rem', 
    render: (text) => <span className="text-gray-500 text-xs">{text}</span>,
  },
  {
    title: 'Action',
    key: 'action',
    width: '6.25rem', 
    render: (_, record) => (
      <Button 
        type="primary" 
        icon={<EyeOutlined />} 
        size="small" 
        className="bg-[#38bdf8] hover:bg-[#0ea5e9] border-none flex items-center gap-1 p-3 font-semibold"
        onClick={() => onView(record.id)}
      >
        View
      </Button>
    ),
  },
];

const Missions = () => {
  // const { data: missions, isLoading, isError } = useMissions();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [filteredData, setFilteredData] = useState(missionsData);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: missionDetail, isLoading: loadingDetail } = useMissionById(selectedId);
  const assignMutation = useMissionAssign();

  const handleView = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleAssign = () => {
    const agentId = prompt("Enter Agent ID to assign:");
    if (agentId) {
      assignMutation.mutate({ id: selectedId, agentId }, {
        onSuccess: () => {
          setIsModalOpen(false);
          alert("Mission assigned successfully!");
        }
      });
    }
  };
 
  // useEffect(() => {
  //   if (missions) {
  //     setFilteredData(missions);
  //   }
  // }, [missions]);

  // if (isLoading) {
  //   return (
  //     <div className="h-full w-full flex items-center justify-center p-20">
  //       <Spin size="large" tip="Loading missions..." />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="p-10">
  //       <h2 className="text-red-500 font-bold">Error 404: Get missions failed</h2>
  //       <p className="text-gray-500">Please check your backend connection.</p>
  //     </div>
  //   );
  // }
  
  //  filter Logic
  const applyFilters = (searchValue, statusValue, categoryValue, dateValues) => {
    const lowercasedSearch = searchValue.toLowerCase();
    
    const filtered = missionsData.filter((mission) => {
      const matchesSearch = 
        mission.id.toLowerCase().includes(lowercasedSearch) ||
        mission.clientPhone.toLowerCase().includes(lowercasedSearch);
      
      const matchesStatus = statusValue === 'all' || mission.status === statusValue;
      const matchesCategory = categoryValue === 'all' || mission.category === categoryValue;

      // date Filtering Logic
      let matchesDate = true;
      if (dateValues && dateValues.length === 2) {
        const start = dateValues[0].startOf('day');
        const end = dateValues[1].endOf('day');
        const missionDate = dayjs(mission.createdDate);
        matchesDate = missionDate.isBetween(start, end, null, '[]');
      }

      return matchesSearch && matchesStatus && matchesCategory && matchesDate;
    });

    setFilteredData(filtered);
  };

  const debouncedFilter = useMemo(
    () => debounce((s, st, cat, dates) => applyFilters(s, st, cat, dates), 500),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFilter(value, status, category, dateRange);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    applyFilters(search, value, category, dateRange);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    applyFilters(search, status, value, dateRange);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    applyFilters(search, status, category, dates);
  };

  return (
    <section className="bg-white w-full h-full p-7 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-[#0f172a]">Mission Supervision</h2>
      
      <Space wrap className="w-full mb-8" size="middle">
        <Search
          placeholder="Search by ID or phone"
          allowClear
          className="w-full md:w-[17.5rem]"
          size="large"
          value={search}
          onChange={handleSearch}
        />

        <Select
          value={status}
          className="w-full md:w-[11.25rem]"
          size="large"
          onChange={handleStatusChange}
        >
          {statusOptions.map(opt => (
            <Option key={opt.value} value={opt.value}>{opt.label}</Option>
          ))}
        </Select>

        <Select
          value={category}
          className="w-full md:w-[11.25rem]"
          size="large"
          onChange={handleCategoryChange}
        >
          {categoryOptions.map(opt => (
            <Option key={opt.value} value={opt.value}>{opt.label}</Option>
          ))}
        </Select>

        <RangePicker
          size="large"
          format="YYYY-MM-DD"
          placeholder={['Start date', 'End date']}
          suffixIcon={<CalendarOutlined />}
          className="w-full md:w-auto"
          value={dateRange}
          onChange={handleDateChange}
        />
      </Space>

      <div className="overflow-x-auto">
        <Table 
          columns={tableColumns(handleView)} 
          dataSource={filteredData} 
          pagination={{ pageSize: 5, position: ['bottomRight'] }}
          scroll={{ x: '75rem' }} 
          className="mission-table"
        />
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2 text-xl border-b pb-3">
            <InfoCircleOutlined className="text-blue-500" />
            <span>Mission Details: <span className="text-gray-400 font-mono text-base">{selectedId}</span></span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
          <Button 
            key="assign" 
            type="primary" 
            className="bg-blue-600"
            onClick={handleAssign}
            loading={assignMutation.isPending}
          >
            Assign Agent
          </Button>
        ]}
        width={800} 
        centered
        style={{ top: 20 }}
      >
        {loadingDetail ? (
          <div className="py-10 text-center"><Spin tip="Loading details..." /></div>
        ) : missionDetail ? (
          <div className="py-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Client Info</h3>
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-blue-400" />
                  <span className="font-semibold text-base">{missionDetail.clientPhone}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Agent Info</h3>
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-green-400" />
                  <span className="font-semibold text-base">{missionDetail.agentPhone || 'Unassigned'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                 <EnvironmentOutlined /> Location & Zone
               </h3>
               <div className="p-4 border rounded-xl bg-blue-50/30 border-blue-100 italic text-gray-600">
                 {missionDetail.address || 'Address detail not provided in API yet.'}
                 <div className="mt-2 font-bold text-blue-600">Zone: {missionDetail.zone}</div>
               </div>
            </div>

            <div className="pt-4 border-t flex justify-between items-center text-sm">
               <div className="text-gray-400 italic">Created at: {missionDetail.createdDate}</div>
               <Tag color={statusTags[missionDetail.status]?.color} className="rounded-full px-4">
                 {missionDetail.status}
               </Tag>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center text-gray-400">No details found.</div>
        )}
      </Modal>
    </section>
  );
};
export default Missions;