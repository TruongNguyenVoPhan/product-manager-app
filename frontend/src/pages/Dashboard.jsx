import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function Dashboard({ products }) {
  const safeProducts = Array.isArray(products) ? products : [];
  const totalValue = safeProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div>
      <h3>📊 Dashboard</h3>
      <p><strong>Total Products:</strong> {safeProducts.length}</p>
      <p><strong>Total Value:</strong> ${totalValue}</p>

      <div className="row mt-4">
        <div className="col-md-6">
          <h6>Bar Chart: Product Prices</h6>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={safeProducts}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="price" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-md-6">
          <h6>Pie Chart: Product Value Distribution</h6>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={safeProducts}
                dataKey="price"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {safeProducts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={["#00C49F", "#FFBB28", "#0088FE"][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
