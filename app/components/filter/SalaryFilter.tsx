import React, { useEffect, useMemo, useState } from 'react';

interface User {
  name: string;
  employeeId?: string;
  category?:string
  // Add other user properties here if needed
}

interface HrFilterProps {
  users: User[];
}

const SalaryFilter = ({ users }: HrFilterProps) => {
  const nameArray = useMemo(() => [...new Set(users?.map((val) => val.name))], [users]);
  
  const [nameSearch, setNameSearch] = useState<string>(() => {
    const saved = localStorage.getItem('nameSearch');
    return saved ? JSON.parse(saved) : "";
  });

  const [selectedNames, setSelectedNames] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedNames');
    return saved ? JSON.parse(saved) : [...nameArray];
  });

  const nameSelectedItems = useMemo(() => {
    return nameArray.filter((item: string) => 
      item.toLowerCase().includes(nameSearch.toLowerCase())
    );
  }, [nameSearch, nameArray]);

  useEffect(() => {
    localStorage.setItem('nameSearch', JSON.stringify(nameSearch));
  }, [nameSearch]);

  useEffect(() => {
    if(selectedNames.length>0){
      localStorage.setItem('selectedNames', JSON.stringify(selectedNames));
    }else{
      localStorage.setItem('selectedNames', JSON.stringify([...nameArray]));
    }
  }, [selectedNames]);

  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value);
  };

  const handleNameSelect = (name: string, isChecked: boolean) => {
    setSelectedNames(prev => {
      return isChecked 
        ? [...prev, name] 
        : prev.filter(n => n !== name);
    });
  };

  const handleSelectAllNames = () => {
    setSelectedNames(prev => [...new Set([...prev, ...nameSelectedItems])]);
  };

  const handleClearAllNames = () => {
    setSelectedNames([]);
  };

  /* ID ARRAY */
  const idArray = useMemo(() => [...new Set(users?.map((val) => val.employeeId))], [users]);
  
  const [idSearch, setIdSearch] = useState<string>(() => {
    const saved = localStorage.getItem('idSearch');
    return saved ? JSON.parse(saved) : "";
  });

  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedIds');
    return saved ? JSON.parse(saved) : [...idArray];
  });

  const idSelectedItems = useMemo(() => {
    return idArray.filter((item) => 
    item && item.toLowerCase().includes(idSearch.toLowerCase())
    );
  }, [idSearch, idArray]);

  useEffect(() => {
    localStorage.setItem('idSearch', JSON.stringify(idSearch));
  }, [idSearch]);

  useEffect(() => {
    if(selectedIds.length>0){
      localStorage.setItem('selectedIds', JSON.stringify(selectedIds));
    }else{
      localStorage.setItem('selectedIds', JSON.stringify([...idArray]));
    }
  }, [selectedIds]);

  const handleIdSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdSearch(e.target.value);
  };

  const handleIdSelect = (name: string, isChecked: boolean) => {
    setSelectedIds(prev => {
      return isChecked 
        ? [...prev, name] 
        : prev.filter(n => n !== name);
    });
  };

  const handleSelectAllIds = () => {
    setSelectedIds((prev):any => [...new Set([...prev, ...idSelectedItems])]);
  };

  const handleClearAllIds = () => {
    setSelectedIds([]);
  };

  /* Category Array */
  const categoryArray = useMemo(() => [...new Set(users?.map((val) => val.category))], [users]);
  
  const [categorySearch, setCategorySearch] = useState<string>(() => {
    const saved = localStorage.getItem('categorySearch');
    return saved ? JSON.parse(saved) : "";
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedCategories');
    return saved ? JSON.parse(saved) : [...categoryArray];
  });

  const categorySelectedItems = useMemo(() => {
    return categoryArray.filter((item) => 
    item && item.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [categorySearch, categoryArray]);

  useEffect(() => {
    localStorage.setItem('categorySearch', JSON.stringify(categorySearch));
  }, [categorySearch]);

  useEffect(() => {
    if(selectedCategories.length>0){
      localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    }else{
      localStorage.setItem('selectedCategories', JSON.stringify([...categorySelectedItems]));
    }
  }, [selectedCategories]);

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorySearch(e.target.value);
  };

  const handleCategorySelect = (name: string, isChecked: boolean) => {
    setSelectedCategories(prev => {
      return isChecked 
        ? [...prev, name] 
        : prev.filter(n => n !== name);
    });
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories((prev):any => [...new Set([...prev, ...categorySelectedItems])]);
  };

  const handleClearAllCategories = () => {
    setSelectedCategories([]);
  };

  useEffect(() => {
    return () => {
      
    };
  }, []);

  return {
    nameArray,
    nameSearch,
    selectedNames,
    nameSelectedItems,
    setSelectedNames,
    handleNameSearch,
    handleNameSelect,
    handleSelectAllNames,
    handleClearAllNames,

    idArray,
    idSearch,
    selectedIds,
    idSelectedItems,
    setSelectedIds,
    handleIdSearch,
    handleIdSelect,
    handleSelectAllIds,
    handleClearAllIds,

    categoryArray,
    categorySearch,
    selectedCategories,
    categorySelectedItems,
    setSelectedCategories,
    handleCategorySearch,
    handleCategorySelect,
    handleSelectAllCategories,
    handleClearAllCategories,
  };
};

export default SalaryFilter;