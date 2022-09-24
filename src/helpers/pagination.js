const pagination = async (page, limit) => {
    const pagination = {};
    if(page && limit){
        const pageAsNumber = Number.parseInt(page); 
        const limitAsNumber = Number.parseInt(limit);

        pagination.page = 0;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber >= 0) {
            pagination.page = pageAsNumber;
        }

        pagination.limit = 10;
        if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0  && limitAsNumber < 50) {
            pagination.limit = limitAsNumber;
        }

        return pagination;
    }else{
        pagination.page = null;
        pagination.limit = null;
        return pagination;
    }
}

module.exports = pagination;