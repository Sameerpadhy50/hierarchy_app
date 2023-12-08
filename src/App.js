import { Button, Collapse, Input } from 'antd';
import './App.css';
import { useState } from 'react';

function App() {
  const [hierarchy, setHierarchy] = useState({
    divisionName: '',
    divisionId: '',
    organizations: [],
  });

  const [organization, setOrganization] = useState({
    organizationName: '',
    organizationId: '',
  });

  const [group, setGroup] = useState({
    groupName: '',
    groupId: '',
  });

  const [showAddOrg, setShowOrg] = useState(false);

  const [groupInputs, setGroupInputs] = useState({});

  const handleDivisionSubmit = () => {
    setShowOrg(true);
  };

  const handleOrgSubmit = () => {
    setHierarchy({
      ...hierarchy,
      organizations: [
        ...hierarchy.organizations,
        { ...organization, groups: [] },
      ],
    });
    setOrganization({
      organizationName: '',
      organizationId: '',
    });
    setGroupInputs({
      ...groupInputs,
      [organization.organizationId]: '',
    });
  };

  const handleGroupDelete = (orgId, groupId) => {
    const updatedOrganizations = hierarchy.organizations.map((org) =>
      org.organizationId === orgId
        ? {
            ...org,
            groups: org.groups.filter((item) => item.groupId !== groupId),
          }
        : org
    );
    setHierarchy({
      ...hierarchy,
      organizations: updatedOrganizations,
    });
  };

  const handleGroupSubmit = (orgId) => {
    const uniqueGroupId = `${orgId}_${Date.now()}`;
    const updatedOrganizations = hierarchy.organizations.map((org) =>
      org.organizationId === orgId
        ? {
            ...org,
            groups: [
              ...org.groups,
              { groupName: groupInputs[orgId], groupId: uniqueGroupId }, // Using the input value from groupInputs
            ],
          }
        : org
    );
    setHierarchy({
      ...hierarchy,
      organizations: updatedOrganizations,
    });
    setGroupInputs({
      ...groupInputs,
      [orgId]: '', // Resetting the input value after adding a group
    });
    setGroup({ groupName: '', groupId: '' });
  };

  const handleGroupInputChange = (orgId, value) => {
    setGroupInputs({
      ...groupInputs,
      [orgId]: value,
    });
  };

  return (
    <div className="App">
      <div>
        <Input
          placeholder="Division Name"
          value={hierarchy.divisionName}
          onChange={(e) =>
            setHierarchy({
              ...hierarchy,
              divisionName: e.target.value,
            })
          }
        />
        <Button onClick={handleDivisionSubmit}>Add Division</Button>
        {showAddOrg && (
          <div>
            <p>Division Name</p>
            <p>{hierarchy.divisionName}</p>
            <br />
            <Input
              placeholder="Organization Name"
              value={organization.organizationName}
              onChange={(e) =>
                setOrganization({
                  ...organization,
                  organizationName: e.target.value,
                  organizationId: `org_${Date.now()}`,
                })
              }
            />
            <Button onClick={handleOrgSubmit}>Add Organization</Button>
          </div>
        )}

        {hierarchy.organizations.length > 0 && (
          <Collapse
            items={hierarchy.organizations.map((ele) => {
              const orgId = ele.organizationId;
              return {
                key: orgId,
                label: ele.organizationName,
                children: (
                  <>
                    <div>
                      <Input
                        value={groupInputs[orgId] || ''}
                        placeholder="Group Name"
                        onChange={(e) =>
                          handleGroupInputChange(orgId, e.target.value)
                        }
                      />
                      <Button onClick={() => handleGroupSubmit(orgId)}>
                        Add Group
                      </Button>
                    </div>
                    {ele.groups.length > 0 &&
                      ele.groups.map((item) => (
                        <div key={item.groupId} style={{ display: 'flex', justifyContent: 'center', gap: '1vmax' }}>
                          <p>{item.groupName}</p>
                          <p onClick={() => handleGroupDelete(orgId, item.groupId)}>Delete</p>
                        </div>
                      ))}
                  </>
                ),
              };
            })}
          />
        )}
      </div>
    </div>
  );
}

export default App;
