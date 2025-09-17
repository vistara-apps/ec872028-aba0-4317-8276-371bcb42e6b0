'use client';

import { useState } from 'react';
import { Plus, X, Clock, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { POLL_CATEGORIES, MIN_POLL_OPTIONS, MAX_POLL_OPTIONS, DEFAULT_POLL_DURATION, MIN_STAKE_AMOUNT } from '../lib/constants';
import { formatTokenAmount } from '../lib/utils';
import type { CreatePollData } from '../lib/types';

interface CreatePollFormProps {
  onSuccess?: (pollId: string) => void;
}

export function CreatePollForm({ onSuccess }: CreatePollFormProps) {
  const [formData, setFormData] = useState<CreatePollData>({
    question: '',
    options: ['', ''],
    duration: DEFAULT_POLL_DURATION,
    minStake: MIN_STAKE_AMOUNT,
    category: 'General',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CreatePollData, string>>>({});

  const addOption = () => {
    if (formData.options.length < MAX_POLL_OPTIONS) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > MIN_POLL_OPTIONS) {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreatePollData, string>> = {};

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    }

    const validOptions = formData.options.filter(option => option.trim());
    if (validOptions.length < MIN_POLL_OPTIONS) {
      newErrors.options = `At least ${MIN_POLL_OPTIONS} options are required`;
    }

    const duplicateOptions = formData.options.filter((option, index) =>
      option.trim() && formData.options.findIndex(o => o.trim() === option.trim()) !== index
    );
    if (duplicateOptions.length > 0) {
      newErrors.options = 'Options must be unique';
    }

    if (formData.duration < 1 || formData.duration > 168) {
      newErrors.duration = 'Duration must be between 1 and 168 hours';
    }

    if (formData.minStake < MIN_STAKE_AMOUNT) {
      newErrors.minStake = `Minimum stake must be at least ${MIN_STAKE_AMOUNT} tokens`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would integrate with the smart contract
      console.log('Creating poll:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock poll ID
      const pollId = `poll_${Date.now()}`;

      onSuccess?.(pollId);
    } catch (error) {
      console.error('Failed to create poll:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedCost = formData.duration * 0.01; // Mock calculation

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-textPrimary">
            Poll Question *
          </label>
          <Input
            type="text"
            placeholder="What would you like to ask your community?"
            value={formData.question}
            onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
            className={errors.question ? 'border-red-500' : ''}
          />
          {errors.question && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.question}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-textPrimary">
              Options * ({formData.options.length}/{MAX_POLL_OPTIONS})
            </label>
            {formData.options.length < MAX_POLL_OPTIONS && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Option
              </Button>
            )}
          </div>

          {formData.options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className={errors.options ? 'border-red-500' : ''}
              />
              {formData.options.length > MIN_POLL_OPTIONS && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeOption(index)}
                  className="px-3"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          {errors.options && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.options}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-textPrimary">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 bg-surface border border-border rounded-md text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {POLL_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-textPrimary">
            Duration (hours) *
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              max="168"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || DEFAULT_POLL_DURATION }))}
              className={errors.duration ? 'border-red-500' : ''}
            />
            <div className="flex items-center gap-1 text-sm text-textSecondary">
              <Clock className="w-4 h-4" />
              <span>{formData.duration}h</span>
            </div>
          </div>
          {errors.duration && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.duration}
            </p>
          )}
        </div>

        {/* Minimum Stake */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-textPrimary">
            Minimum Stake (DEGEN/WETH) *
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={MIN_STAKE_AMOUNT}
              step="0.1"
              value={formData.minStake}
              onChange={(e) => setFormData(prev => ({ ...prev, minStake: parseFloat(e.target.value) || MIN_STAKE_AMOUNT }))}
              className={errors.minStake ? 'border-red-500' : ''}
            />
            <div className="flex items-center gap-1 text-sm text-textSecondary">
              <TrendingUp className="w-4 h-4" />
              <span>Min: {MIN_STAKE_AMOUNT}</span>
            </div>
          </div>
          {errors.minStake && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.minStake}
            </p>
          )}
        </div>

        {/* Cost Estimation */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-textPrimary">Estimated Cost</span>
            </div>
            <span className="text-sm font-semibold text-primary">
              {formatTokenAmount(estimatedCost)} ETH
            </span>
          </div>
          <p className="text-xs text-textSecondary mt-1">
            Based on poll duration and network fees
          </p>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? 'Creating Poll...' : 'Create Poll'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

