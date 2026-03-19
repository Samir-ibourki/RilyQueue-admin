export const statusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Requested', value: 'Requested' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Assigned', value: 'Assigned' },
  { label: 'In Progress', value: 'InProgress' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Disputed', value: 'Disputed' },
  { label: 'Cancelled', value: 'Cancelled' },
];

export const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  { label: 'Queue', value: 'Queue' },
  { label: 'Depot', value: 'Depot' },
  { label: 'Recup', value: 'Recup' },
  { label: 'Course', value: 'Course' },
];

export const statusTags = {
  Requested: { color: 'blue' },
  Paid: { color: 'purple' },
  Assigned: { color: 'orange' },
  InProgress: { color: 'cyan', label: 'In Progress' },
  Completed: { color: 'green' },
  Disputed: { color: 'red' },
  Cancelled: { color: 'default' },
};

export const categoryTags = {
  Queue: 'blue',
  Depot: 'cyan',
  Recup: 'purple',
  Course: 'orange',
};

export const columns = ['Mission Id', 'Client Phone','Agent Phone','Category', 'Status','Price','Express', 'Zone','Created Date','Action' ]

export const missionsData = [
  {
    key: '1',
    id: 'M001',
    clientPhone: '+212 6XX XXX 101',
    agentPhone: '+212 6XX XXX 004',
    category: 'Queue',
    status: 'InProgress',
    price: '50 MAD',
    express: 'Yes',
    zone: 'Agdal',
    createdDate: '2026-02-24 09:30',
  },
  {
    key: '2',
    id: 'M002',
    clientPhone: '+212 6XX XXX 102',
    agentPhone: '-',
    category: 'Depot',
    status: 'Completed',
    price: '30 MAD',
    express: 'No',
    zone: 'Ocean',
    createdDate: '2026-02-24 08:15',
  },
  {
    key: '3',
    id: 'M003',
    clientPhone: '+212 6XX XXX 103',
    agentPhone: '+212 6XX XXX 008',
    category: 'Recup',
    status: 'Assigned',
    price: '40 MAD',
    express: 'No',
    zone: 'Hay Riad',
    createdDate: '2026-02-24 10:00',
  },
 
];